"use client";
import { Timeline } from '@/app/components/ui/Timeline'
import { timelineData } from '@/app/data/mock/timeline'

function Experience() {
    return (
        <div className="relative w-full overflow-clip">
            <Timeline data={timelineData} />
        </div>
    );
}

export default Experience;
