'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import Grid from "@/components/grid"
import Header from "@/components/header"
import SmallHeader from "@/components/small-header"
import HBorder from "@/components/h-border"
import { InstagramButton, LinkedInButton } from "@/components/social-button"

const SponsorsPage: FC = () => {
  return (
    <div className="relative">
      <div className="relative flex min-h-screen flex-col">
        {/* Header */}
        <div className="desktop:block hidden">
          <Header />
        </div>
        <div className="desktop:hidden block">
          <SmallHeader />
        </div>

        {/* Background Elements */}
        <div className="-z-20">
          <Grid />
        </div>
        <div className="fixed inset-0 bg-[#020817] -z-30" />

        <HBorder />

        {/* Main Content */}
        <div className="desktop:pl-[64px] flex flex-1 flex-col items-start pl-6 text-left text-white">
          <div className="w-full">
            {/* Partners Title and Socials Section */}
            <div className="py-[70px] flex justify-between items-center w-full">
              <h1 className="font-(family-name:--font-heading) text-5xl leading-[52.80px]">Partners</h1>
              <div className="flex items-center gap-8">
                <InstagramButton url="https://www.instagram.com/hack404.dev/" />
                <LinkedInButton url="https://www.linkedin.com/company/hack404/" />
              </div>
            </div>

            <HBorder />

            {/* UTMIST Section */}
            <div className="py-[70px]">
              <h2 className="font-(family-name:--font-heading-light) text-4xl leading-relaxed mb-4">UTMIST</h2>
              <p className="text-2xl font-(family-name:--font-heading-light) leading-relaxed text-gray-400 mb-4">Sponsor description can go here</p>
              <div className="h-64 bg-black/30 flex items-center justify-center rounded-lg">
                <div className="w-96 h-24 bg-black/20 flex items-center justify-center">
                  [UTMIST Logo Placeholder]
                </div>
              </div>
            </div>

            <HBorder />



            {/* Sponsors Title Section */}
            <div className="py-[70px]">
              <h1 className="font-(family-name:--font-heading) text-5xl leading-[52.80px]">Sponsors</h1>
            </div>

            <HBorder />

            {/* CGI Section */}
            <div className="py-[70px]">
              <h2 className="font-(family-name:--font-heading-light) text-4xl leading-relaxed mb-4">CGI</h2>
              <p className="text-2xl font-(family-name:--font-heading-light) leading-relaxed text-gray-400 mb-4">Sponsor description can go here</p>
              <div className="h-64 bg-black/30 flex items-center justify-center rounded-lg">
                <div className="w-96 h-24 bg-black/20 flex items-center justify-center">
                  [CGI Logo Placeholder]
                </div>
              </div>
            </div>

            <HBorder />

            {/* Vitasoy Section */}
            <div className="py-[70px]">
              <h2 className="font-(family-name:--font-heading-light) text-4xl leading-relaxed mb-4">Vitasoy</h2>
              <p className="text-2xl font-(family-name:--font-heading-light) leading-relaxed text-gray-400 mb-4">Sponsor description can go here</p>
              <div className="h-64 bg-black/30 flex items-center justify-center rounded-lg">
                <div className="w-96 h-24 bg-black/20 flex items-center justify-center">
                  [Vitasoy Logo Placeholder]
                </div>
              </div>
            </div>

            <HBorder />

            {/* The Remington Group Section */}
            <div className="py-[70px]">
              <h2 className="font-(family-name:--font-heading-light) text-4xl leading-relaxed mb-4">The Remington Group</h2>
              <p className="text-2xl font-(family-name:--font-heading-light) leading-relaxed text-gray-400 mb-4">Sponsor description can go here</p>
              <div className="h-64 bg-black/30 flex items-center justify-center rounded-lg">
                <div className="w-96 h-24 bg-black/20 flex items-center justify-center">
                  [Remington Group Logo Placeholder]
                </div>
              </div>
            </div>

            <HBorder />

            {/* Contact Section */}
            <div className="py-[70px] flex flex-col items-start gap-8">
              <div className="flex flex-col items-start gap-8">
                <h2 className="font-(family-name:--font-heading) text-6xl leading-[1.1]">Contact</h2>
                <div className="text-4xl font-(family-name:--font-heading-light) gradient-text leading-relaxed">
                  <p>support@hack404.dev</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SponsorsPage
