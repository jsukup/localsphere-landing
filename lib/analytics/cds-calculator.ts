// Customer Demand Score (CDS) calculation for LAUNCH Framework validation
// CDS is a 0-100 score combining engagement and conversion signals

export interface CDSInputs {
  // Engagement signals (25 points max)
  ctrFromAds?: number           // Click-through rate from ads (0-1)
  timeOnSite?: number          // Time on site in minutes
  scrollDepth?: number         // Scroll depth percentage (0-100)
  pagesPerSession?: number     // Pages viewed per session
  isReturnVisitor?: boolean    // Has visited before

  // Conversion signals (35 points max)
  ctaClicked?: boolean         // Clicked any CTA
  emailCaptured?: boolean      // Provided email address
  demoRequested?: boolean      // Requested demo/trial
  pricingEngaged?: boolean     // Interacted with pricing

  // Quality indicators (20 points max - calculated from other metrics)
  sessionQuality?: number      // Derived quality score
  
  // Economic indicators (20 points max - requires ad spend data)
  costPerConversion?: number   // Ad spend per conversion
  estimatedLTV?: number        // Estimated lifetime value
}

export interface CDSResult {
  totalScore: number           // 0-100 total CDS score
  engagementScore: number      // 0-25 engagement component
  conversionScore: number      // 0-35 conversion component
  qualityScore: number         // 0-20 quality component
  economicScore: number        // 0-20 economic component
  level: 'low' | 'medium' | 'high' | 'excellent'
  recommendations: string[]
}

export function calculateCDS(inputs: CDSInputs): CDSResult {
  let engagementScore = 0
  let conversionScore = 0
  let qualityScore = 0
  let economicScore = 0

  // Engagement Score (25 points max)
  if (inputs.ctrFromAds) {
    engagementScore += Math.min(inputs.ctrFromAds * 100, 5) // Max 5 points
  }
  
  if (inputs.timeOnSite) {
    engagementScore += Math.min(inputs.timeOnSite / 60, 5) // Max 5 points for 5+ minutes
  }
  
  if (inputs.scrollDepth) {
    engagementScore += Math.min(inputs.scrollDepth / 20, 5) // Max 5 points for 100% scroll
  }
  
  if (inputs.pagesPerSession) {
    engagementScore += Math.min(inputs.pagesPerSession * 2.5, 5) // Max 5 points for 2+ pages
  }
  
  if (inputs.isReturnVisitor) {
    engagementScore += 5 // Return visitor bonus
  }

  // Conversion Score (35 points max)
  if (inputs.ctaClicked) {
    conversionScore += 10 // CTA click
  }
  
  if (inputs.emailCaptured) {
    conversionScore += 10 // Email capture
  }
  
  if (inputs.demoRequested) {
    conversionScore += 10 // Demo request
  }
  
  if (inputs.pricingEngaged) {
    conversionScore += 5 // Pricing engagement
  }

  // Quality Score (20 points max)
  // Derived from engagement patterns and conversion context
  if (inputs.sessionQuality) {
    qualityScore = Math.min(inputs.sessionQuality * 20, 20)
  } else {
    // Calculate quality from available metrics
    const hasDeepEngagement = (inputs.timeOnSite || 0) > 2 && (inputs.scrollDepth || 0) > 50
    const hasMultipleEngagements = [inputs.ctaClicked, inputs.pricingEngaged, inputs.isReturnVisitor].filter(Boolean).length >= 2
    
    if (hasDeepEngagement && hasMultipleEngagements) {
      qualityScore = 20
    } else if (hasDeepEngagement || hasMultipleEngagements) {
      qualityScore = 15
    } else if (inputs.timeOnSite && inputs.timeOnSite > 1) {
      qualityScore = 10
    } else {
      qualityScore = 5
    }
  }

  // Economic Score (20 points max) 
  // Requires ad spend and conversion data
  if (inputs.costPerConversion && inputs.estimatedLTV) {
    const efficiency = inputs.estimatedLTV / inputs.costPerConversion
    if (efficiency > 10) {
      economicScore = 20 // Very efficient
    } else if (efficiency > 5) {
      economicScore = 15 // Efficient
    } else if (efficiency > 3) {
      economicScore = 10 // Moderate
    } else if (efficiency > 1) {
      economicScore = 5 // Break-even
    }
    // efficiency <= 1 = 0 points (losing money)
  }

  const totalScore = Math.min(engagementScore + conversionScore + qualityScore + economicScore, 100)

  // Determine level
  let level: 'low' | 'medium' | 'high' | 'excellent'
  if (totalScore >= 80) {
    level = 'excellent'
  } else if (totalScore >= 60) {
    level = 'high'
  } else if (totalScore >= 40) {
    level = 'medium'
  } else {
    level = 'low'
  }

  // Generate recommendations
  const recommendations: string[] = []
  
  if (engagementScore < 15) {
    recommendations.push("Improve user engagement: optimize page load speed, enhance content relevance, add interactive elements")
  }
  
  if (conversionScore < 20) {
    recommendations.push("Strengthen conversion paths: clarify value proposition, optimize CTAs, reduce form friction")
  }
  
  if (qualityScore < 15) {
    recommendations.push("Focus on traffic quality: refine targeting, improve ad copy, enhance landing page relevance")
  }
  
  if (economicScore < 10 && inputs.costPerConversion) {
    recommendations.push("Optimize ad spend: reduce acquisition costs, improve conversion rates, test new channels")
  }
  
  if (totalScore < 40) {
    recommendations.push("Consider pivoting: current validation signals suggest low market demand for this approach")
  } else if (totalScore > 70) {
    recommendations.push("Strong validation signals: consider moving to MVP development phase")
  }

  return {
    totalScore: Math.round(totalScore),
    engagementScore: Math.round(engagementScore),
    conversionScore: Math.round(conversionScore),
    qualityScore: Math.round(qualityScore),
    economicScore: Math.round(economicScore),
    level,
    recommendations
  }
}

// Helper function to track CDS calculation in PostHog
export function trackCDSCalculation(variant: string, cdsResult: CDSResult, inputs: CDSInputs) {
  // This should be called by the tracking system
  const trackValidationEvent = (window as unknown as { trackValidationEvent?: (event: string, properties: Record<string, unknown>) => void }).trackValidationEvent
  
  if (trackValidationEvent) {
    trackValidationEvent('cds_calculation', {
      variant,
      total_score: cdsResult.totalScore,
      engagement_score: cdsResult.engagementScore,
      conversion_score: cdsResult.conversionScore,
      quality_score: cdsResult.qualityScore,
      economic_score: cdsResult.economicScore,
      level: cdsResult.level,
      launch_metric: 'customer_demand_score',
      
      // Input context for analysis
      has_email_capture: inputs.emailCaptured,
      has_demo_request: inputs.demoRequested,
      has_cta_click: inputs.ctaClicked,
      time_on_site_minutes: inputs.timeOnSite,
      scroll_depth_percent: inputs.scrollDepth,
      is_return_visitor: inputs.isReturnVisitor
    })
  }
}

// Aggregate CDS calculation for multiple sessions
export function calculateAggregateCDS(sessionResults: CDSResult[]): CDSResult {
  if (sessionResults.length === 0) {
    return {
      totalScore: 0,
      engagementScore: 0,
      conversionScore: 0,
      qualityScore: 0,
      economicScore: 0,
      level: 'low',
      recommendations: ['No data available for CDS calculation']
    }
  }

  const avgTotalScore = sessionResults.reduce((sum, result) => sum + result.totalScore, 0) / sessionResults.length
  const avgEngagementScore = sessionResults.reduce((sum, result) => sum + result.engagementScore, 0) / sessionResults.length
  const avgConversionScore = sessionResults.reduce((sum, result) => sum + result.conversionScore, 0) / sessionResults.length
  const avgQualityScore = sessionResults.reduce((sum, result) => sum + result.qualityScore, 0) / sessionResults.length
  const avgEconomicScore = sessionResults.reduce((sum, result) => sum + result.economicScore, 0) / sessionResults.length

  // Determine level based on average
  let level: 'low' | 'medium' | 'high' | 'excellent'
  if (avgTotalScore >= 80) {
    level = 'excellent'
  } else if (avgTotalScore >= 60) {
    level = 'high'
  } else if (avgTotalScore >= 40) {
    level = 'medium'
  } else {
    level = 'low'
  }

  return {
    totalScore: Math.round(avgTotalScore),
    engagementScore: Math.round(avgEngagementScore), 
    conversionScore: Math.round(avgConversionScore),
    qualityScore: Math.round(avgQualityScore),
    economicScore: Math.round(avgEconomicScore),
    level,
    recommendations: [
      `Aggregate CDS from ${sessionResults.length} sessions`,
      `Average performance level: ${level}`,
      `Consider A/B testing to improve scores below 70`
    ]
  }
}