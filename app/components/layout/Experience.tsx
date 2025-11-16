"use client";
import ResumeTimeline from '@/app/components/ui/Timeline'
import { timelineData } from '@/app/data/mock/timeline'
import { TimelineItem } from '@/app/core/types/timeline.type'

function Experience() {
    const data: TimelineItem[] = timelineData
    return (
        <section className='container mx-auto min-h-screen px-4 flex items-center justify-center'>
            <div className='w-full text-center'>
                <ResumeTimeline items={data} />
            </div>
        </section>
    )
}

export default Experience
