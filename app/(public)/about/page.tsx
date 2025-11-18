import Experience from "@/app/components/layout/Experience"
import ShinyText from "@/app/components/ui/shinyText"
import { DraggableCardContainer, DraggableCardBody } from '@/app/components/ui/DraggleCard'
import { cardData } from "@/app/data/mock/card"
import { cn } from "@/lib/utils"


function About() {
    const items = cardData
    return (
        <main className='container mx-auto px-4 flex flex-col items-center justify-center overflow-visible'>
            <section className="min-h-screen flex flex-col justify-center items-center gap-4 lg:gap-12 overflow-visible">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-12 items-center justify-center p-4 relative">
                    <div className="flex flex-col justify-center items-center gap-y-4 lg:gap-y-8 relative z-0">
                        <h1 className="text-4xl font-instrument-serif tracking-tight">MORE ABOUT ME</h1>
                        <ShinyText className="text-4xl font-instrument-serif tracking-tight" text="I'm Soulisack Duangvilay, a Software Developer" />
                        <p className='text-lg text-muted-foreground text-start leading-loose'>
                            <span className="font-extrabold">
                                Now, my main position is Backend Developer.
                            </span> eligendi modi, voluptas ratione praesentium minus magnam saepe vero eveniet officiis quaerat dignissimos quia delectus nesciunt in deserunt architecto. Voluptate, ipsa. Quis dolore magnam rerum, expedita aut similique! lorem200
                        </p>
                    </div>
                    <div className="hidden md:block relative z-10">
                        <DraggableCardContainer className="relative flex min-h-screen w-full items-center justify-center overflow-visible">
                            <p className="absolute top-1/2 mx-auto max-w-sm -translate-y-3/4 text-center text-2xl font-black text-neutral-400 md:text-4xl dark:text-neutral-800 pointer-events-none">
                                <span className="font-extrabold text-white/20">Go as far</span>
                                <span className="font-extrabold text-white/40"> as you can</span>
                            </p>
                            {items.map((item) => (
                                <DraggableCardBody key={item.title} className={cn(item.className, "z-20")}>
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="pointer-events-none relative z-10 h-55 w-80 object-cover"
                                    />
                                    <h3 className="mt-4 text-center text-2xl font-bold text-neutral-700 dark:text-neutral-300">
                                        {item.title}
                                    </h3>
                                </DraggableCardBody>
                            ))}
                        </DraggableCardContainer>
                    </div>
                </div>
            </section>
            <Experience />
        </main>
    )
}

export default About
