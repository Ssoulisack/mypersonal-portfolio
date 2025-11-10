import React from 'react'

const generalLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
]

function Footer() {
  return (
    <footer id='footer' className="container mx-auto py-10">
      <div className="relative flex w-full flex-col justify-between items-center gap-6 md:flex-row md:items-start">
        <div className="hidden max-w-sm flex-col gap-y-6 text-center md:flex md:text-left">
          <h1 className="text-2xl font-bold">24thurs</h1>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium">24thurs</span> is a personal website
            portfolio created by <span className="font-medium">24thurs</span>.
          </p>
        </div>
        <div className="flex flex-col items-center justify-between gap-6 rounded-3xl p-5 max-sm:bg-primary/[0.05] sm:flex-row sm:items-start sm:gap-16 lg:gap-32">
          <div className="flex flex-col gap-y-2">
            <div className="flex flex-col gap-2 text-center sm:text-left sm:gap-4">
              <h4 className="text-base font-geist-mono text-neutral-700">
                General
              </h4>
              <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-base text-neutral-500 sm:items-start sm:justify-start sm:flex-col sm:gap-y-3">
                {generalLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="group relative inline-flex items-center before:pointer-events-none before:absolute before:top-[1.5em] before:left-0 before:h-[0.05em] before:w-full before:bg-current before:content-[''] before:origin-right before:scale-x-0 before:transition-transform before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)] hover:before:origin-left hover:before:scale-x-100"
                    >
                      {link.label}
                      <svg
                        aria-hidden="true"
                        className="-translate-x-1 ml-[0.3em] size-[0.65em] opacity-0 transition-all duration-300 [motion-reduce:transition-none] group-hover:translate-x-0 group-hover:opacity-100"
                        fill="none"
                        viewBox="0 0 10 10"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.667 5h6.666m0 0L5 1.667M8.333 5 5 8.333"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.25"
                        ></path>
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-col gap-y-2">
            <div className="flex flex-col gap-2 text-center sm:text-left sm:gap-4">
              <h4 className="text-base font-geist-mono text-neutral-700">
                General
              </h4>
              <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-base text-neutral-500 sm:items-start sm:justify-start sm:flex-col sm:gap-y-3">
                {generalLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="group relative inline-flex items-center before:pointer-events-none before:absolute before:top-[1.5em] before:left-0 before:h-[0.05em] before:w-full before:bg-current before:content-[''] before:origin-right before:scale-x-0 before:transition-transform before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)] hover:before:origin-left hover:before:scale-x-100"
                    >
                      {link.label}
                      <svg
                        aria-hidden="true"
                        className="-translate-x-1 ml-[0.3em] size-[0.65em] opacity-0 transition-all duration-300 [motion-reduce:transition-none] group-hover:translate-x-0 group-hover:opacity-100"
                        fill="none"
                        viewBox="0 0 10 10"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.667 5h6.666m0 0L5 1.667M8.333 5 5 8.333"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.25"
                        ></path>
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-col gap-y-2">
            <div className="flex flex-col gap-2 text-center sm:text-left sm:gap-4">
              <h4 className="text-base font-geist-mono text-neutral-700">
                General
              </h4>
              <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-base text-neutral-500 sm:items-start sm:justify-start sm:flex-col sm:gap-y-3">
                {generalLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="group relative inline-flex items-center before:pointer-events-none before:absolute before:top-[1.5em] before:left-0 before:h-[0.05em] before:w-full before:bg-current before:content-[''] before:origin-right before:scale-x-0 before:transition-transform before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)] hover:before:origin-left hover:before:scale-x-100"
                    >
                      {link.label}
                      <svg
                        aria-hidden="true"
                        className="-translate-x-1 ml-[0.3em] size-[0.65em] opacity-0 transition-all duration-300 [motion-reduce:transition-none] group-hover:translate-x-0 group-hover:opacity-100"
                        fill="none"
                        viewBox="0 0 10 10"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.667 5h6.666m0 0L5 1.667M8.333 5 5 8.333"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.25"
                        ></path>
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className='text-sm flex items-center justify-start gap-x-4'>
        <p className="">
          © {new Date().getFullYear()} - All rights reserved
        </p>
        <div className="flex gap-x-6">
          <a
            href="/"
            className="relative before:pointer-events-none before:absolute before:top-[1.5em] before:left-0 before:h-[0.05em] before:w-full before:bg-primary before:content-[''] before:origin-right before:scale-x-0 before:transition-transform before:duration-500 before:ease-[cubic-bezier(0.4,0,0.2,1)] hover:before:origin-left hover:before:scale-x-100"
              //  before:pointer-events-none before:absolute before:top-[1.5em] before:left-0 before:h-[0.05em] before:w-full before:bg-primary before:content-[''] before:origin-right before:scale-x-0 before:transition-transform before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)] hover:before:origin-left hover:before:scale-x-100
          >
            Privacy Policy
          </a>

          <a
            href="/"
            className="relative after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[1px]
               after:bg-primary after:transition-all after:duration-500 hover:after:w-full"
          >
            Terms & Conditions
          </a>
        </div>


      </div>
    </footer>
  )
}

export default Footer