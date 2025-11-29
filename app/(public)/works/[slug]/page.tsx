import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getWorkBySlug, getAllWorkSlugs } from '@/app/data/mock/works';
import { getTocDataBySlug } from '@/app/data/mock/toc';
import { TableOfContents } from '@/app/components/ui/TableOfContents';

interface WorkPageProps {
    params: Promise<{
        slug: string;
    }>;
}

// Generate static params for all works at build time
export async function generateStaticParams() {
    const slugs = getAllWorkSlugs();
    return slugs.map((slug) => ({
        slug,
    }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: WorkPageProps) {
    const { slug } = await params;
    const work = getWorkBySlug(slug);
    console.log(work)
    if (!work) {
        return {
            title: 'Work Not Found',
        };
    }

    return {
        title: `${work.title} | Works`,
        description: work.description,
    };
}

export default async function WorkPage({ params }: WorkPageProps) {
    const { slug } = await params;
    const work = getWorkBySlug(slug);
    const tocData = getTocDataBySlug(slug);

    if (!work) {
        notFound();
    }

    return (
        <main className="container mx-auto min-h-screen px-4 flex flex-col gap-y-4 lg:gap-y-16 justify-center items-center py-4 lg:py-[10em]">
            <div className="w-full">
                <Link
                    href="/works"
                    className="inline-flex items-center text-sm text-white/70 hover:text-white transition-colors mb-8"
                >
                    ← Back to Works
                </Link>

                <div className='flex flex-1 mx-auto w-full'>
                    <div className="flex min-w-0 w-full flex-col gap-8 px-4 pt-8 md:px-6 md:mx-auto xl:pt-12 xl:px-12 mx-auto prose-lg prose-a:underline-offset-4 prose-a:decoration-blue-500">
                        <section id="overview" className="scroll-m-28">
                            <div className="w-full flex flex-col gap-4 justify-center items-center mb-4">
                                <h1 className="text-4xl lg:text-5xl font-instrument-serif tracking-tight mb-4 text-white">
                                    {work.title}
                                </h1>
                                <p className="text-lg text-white/80 leading-relaxed">
                                    {work.description}
                                </p>
                            </div>
                            <div className="w-1/2 mx-auto h-[60%] bg-black border border-white/10 rounded-2xl px-4 py-2 overflow-hidden flex items-center justify-center">
                                {work.content}
                            </div>
                        </section>
                        <div className='w-full flex flex-col'>
                            {/* Key Features */}
                            {work.keyFeatures && work.keyFeatures.length > 0 && (
                                <section id="key-features" className="scroll-m-28">
                                    <h2 className="flex scroll-m-28 flex-row items-center gap-2 text-white text-2xl font-semibold mb-4">
                                        🧩 Key Features
                                    </h2>
                                    <ul className="space-y-2 text-white/80">
                                        {work.keyFeatures.map((feature, index) => (
                                            <li key={index} className="flex items-start gap-2">
                                                <span className="mt-1">{feature.title}</span>
                                                {feature.description && (
                                                    <span className="text-white/60">— {feature.description}</span>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            )}

                            {/* Tech Stack */}
                            {work.techStack && work.techStack.length > 0 && (
                                <section id="tech-stack" className="scroll-m-28 mt-8">
                                    <h2 className="flex scroll-m-28 flex-row items-center gap-2 text-white text-2xl font-semibold mb-4">
                                        🧪 Tech Stack
                                    </h2>
                                    <ul className="space-y-2 text-white/80">
                                        {work.techStack.map((tech, index) => (
                                            <li key={index}>
                                                {tech.url ? (
                                                    <a
                                                        href={tech.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-400 hover:text-blue-300 underline"
                                                    >
                                                        <strong>{tech.name}</strong>
                                                    </a>
                                                ) : (
                                                    <strong>{tech.name}</strong>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            )}

                            {/* Challenges */}
                            {work.challenges && work.challenges.length > 0 && (
                                <section id="challenges" className="scroll-m-28 mt-8">
                                    <h2 className="flex scroll-m-28 flex-row items-center gap-2 text-white text-2xl font-semibold mb-4">
                                        🧠 Challenges & Learnings
                                    </h2>
                                    <ul className="space-y-2 text-white/80">
                                        {work.challenges.map((challenge, index) => (
                                            <li key={index} className="flex items-start gap-2">
                                                <span className="mt-1">{challenge.title}</span>
                                                {challenge.description && (
                                                    <span className="text-white/60">— {challenge.description}</span>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            )}

                            {/* Outcome */}
                            {work.outcome && (
                                <section id="outcome" className="scroll-m-28 mt-8">
                                    <h2 className="flex scroll-m-28 flex-row items-center gap-2 text-white text-2xl font-semibold mb-4">
                                        🎯 Outcome
                                    </h2>
                                    <p className="text-white/80 leading-relaxed">{work.outcome}</p>
                                </section>
                            )}
                        </div>
                    </div>
                    <TableOfContents data={tocData} />
                </div>
            </div>
        </main>
    );
}