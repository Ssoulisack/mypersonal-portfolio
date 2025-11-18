"use client";
import { TracingBeam } from '@/app/components/ui/Timeline'
import { timelineData } from '@/app/data/mock/timeline'
import { TimelineItem } from '@/app/core/types/timeline.type'

function Experience() {
    const data: TimelineItem[] = timelineData
    return (
        <section className='container mx-auto min-h-screen px-4 flex items-center justify-center'>
            <div className='w-full text-center'>
                <TracingBeam className="px-6">
                    <div className="max-w-2xl mx-auto antialiased pt-4 relative">
                        {timelineData.map((item, index) => (
                            <div key={`content-${index}`} className="mb-10">
                                <div className='flex justify-start items-center gap-x-4 '>
                                    <h2 className="text-sm text-muted-foreground">
                                        {item.badge}
                                    </h2>
                                </div>

                                <div className='flex flex-col justify-center items-center gap-x-4 lg:gap-x-8'>
                                    <div>
                                        <p className="text-xl mb-4 font-instrument-serif">
                                            {item.title}
                                        </p>
                                    </div>
                                    {item?.image && (
                                        <img
                                            src={item.image}
                                            alt="blog thumbnail"
                                            height="200"
                                            width="200"
                                            className="rounded-lg mb-10 object-cover"
                                        />
                                    )}
                                    <div className="text-sm text-start">
                                        {item.description}
                                    </div>
                                    <div className="relative pt-6 mt-2">
                                        {/* Gradient Border Top */}
                                        <div className="top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-500/30 to-transparent"></div>
                                        {/* Optional: Add a subtle glow effect */}
                                        <div className="top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent blur-sm"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </TracingBeam>
            </div>
        </section>
    );
}

export default Experience;
