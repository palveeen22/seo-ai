import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { fetchMetadata } from '@/shared/lib/metadata'
import type { MetadataResult } from '@/shared/lib/metadata'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

function getModel() {
  return genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })
}

function buildPrompt(existingMetadata?: MetadataResult, prompt?: string): string {
  const base = `You are an SEO expert. Generate optimized metadata for a webpage.
Return ONLY a valid JSON object (no markdown, no code blocks) matching this exact structure:
{
  "title": "SEO optimized title (50-60 chars)",
  "description": "Compelling meta description (150-160 chars)",
  "keywords": "comma, separated, keywords",
  "ogTitle": "Open Graph title",
  "ogDescription": "Open Graph description",
  "ogType": "website",
  "ogSiteName": "Site name",
  "ogLocale": "en_US",
  "twitterCard": "summary_large_image",
  "twitterTitle": "Twitter card title",
  "twitterDescription": "Twitter card description",
  "robots": "index, follow",
  "viewport": "width=device-width, initial-scale=1",
  "charset": "UTF-8",
  "language": "en",
  "sitemapExists": false,
  "robotsTxtExists": false
}

Include ALL fields that make sense. For fields you cannot determine, omit them.
Make titles engaging and click-worthy while being accurate.
Make descriptions compelling with clear value propositions.
Optimize keywords for search intent.`

  if (existingMetadata) {
    return `${base}

Here is the current metadata for this page. Analyze it and generate IMPROVED, SEO-optimized versions of all fields:

Current metadata:
${JSON.stringify(existingMetadata, null, 2)}

Generate better metadata that will improve search rankings and social media engagement. Keep what's already good, improve what's weak, and add missing fields.`
  }

  if (prompt) {
    return `${base}

Generate optimized metadata for a webpage with this description:
${prompt}

Create complete, professional metadata that would rank well in search engines and look great when shared on social media.`
  }

  return base
}

export async function POST(request: Request) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Gemini API key is not configured' },
        { status: 500 }
      )
    }

    const { url, prompt } = await request.json()

    if (!url && !prompt) {
      return NextResponse.json(
        { error: 'URL or prompt is required' },
        { status: 400 }
      )
    }

    let existingMetadata: MetadataResult | undefined
    if (url) {
      try {
        existingMetadata = await fetchMetadata(url)
      } catch {
        // If fetch fails, we'll generate from scratch
      }
    }

    const geminiPrompt = buildPrompt(existingMetadata, prompt)
    const model = getModel()
    const result = await model.generateContent(geminiPrompt)
    const textContent = result.response.text()

    if (!textContent) {
      return NextResponse.json(
        { error: 'No response from AI' },
        { status: 502 }
      )
    }

    // Parse JSON from Gemini response (strip markdown code blocks if present)
    const jsonString = textContent.replace(/```json?\n?/g, '').replace(/```\n?/g, '').trim()
    const generatedMetadata: MetadataResult = JSON.parse(jsonString)

    // Ensure required boolean fields
    generatedMetadata.sitemapExists = generatedMetadata.sitemapExists ?? existingMetadata?.sitemapExists ?? false
    generatedMetadata.robotsTxtExists = generatedMetadata.robotsTxtExists ?? existingMetadata?.robotsTxtExists ?? false

    // Carry over fields AI can't generate (images, URLs from existing)
    if (existingMetadata) {
      generatedMetadata.ogImage = generatedMetadata.ogImage ?? existingMetadata.ogImage
      generatedMetadata.ogImageWidth = existingMetadata.ogImageWidth
      generatedMetadata.ogImageHeight = existingMetadata.ogImageHeight
      generatedMetadata.twitterImage = generatedMetadata.twitterImage ?? existingMetadata.twitterImage
      generatedMetadata.favicon = existingMetadata.favicon
      generatedMetadata.appleTouchIcon = existingMetadata.appleTouchIcon
      generatedMetadata.canonicalUrl = existingMetadata.canonicalUrl
      generatedMetadata.ogUrl = existingMetadata.ogUrl ?? existingMetadata.canonicalUrl
      generatedMetadata.sitemapUrl = existingMetadata.sitemapUrl
      generatedMetadata.sitemapExists = existingMetadata.sitemapExists
      generatedMetadata.robotsTxtExists = existingMetadata.robotsTxtExists
      generatedMetadata.robotsTxtContent = existingMetadata.robotsTxtContent
      generatedMetadata.discordTitle = generatedMetadata.ogTitle
      generatedMetadata.discordDescription = generatedMetadata.ogDescription
      generatedMetadata.discordImage = generatedMetadata.ogImage
      generatedMetadata.slackTitle = generatedMetadata.ogTitle
      generatedMetadata.slackDescription = generatedMetadata.ogDescription
      generatedMetadata.slackImage = generatedMetadata.ogImage
    }

    return NextResponse.json(generatedMetadata)
  } catch (error) {
    console.error('Error generating metadata:', error)
    return NextResponse.json(
      { error: 'Failed to generate metadata' },
      { status: 500 }
    )
  }
}
