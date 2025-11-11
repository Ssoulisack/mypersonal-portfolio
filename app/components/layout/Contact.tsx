import Magnet from "../ui/Magnet"
import { ArrowRightIcon } from "lucide-react"
import DraggableBadge from "../ui/DraggableBadge"

function Contact() {
    return (
        <section
            id="contact-section"
            className="relative w-full min-h-screen overflow-hidden bg-cover bg-start bg-no-repeat px-6 py-24"
            style={{ backgroundImage: "url('/images/cover-contact.jpg')" }}
        >
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[rgba(8,1,19,0.92)]"></div>
            <div aria-hidden="true" className="absolute inset-0 z-10 bg-gradient-to-t from-[rgba(8,1,19,0.95)] via-[rgba(20,9,44,0.88)] to-[rgba(8,1,19,0.95)]"></div>

            <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center gap-12 text-center">
                <div>
                    <svg id="logo" width="124" height="124" viewBox="0 0 100 178" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M88.9877 74.8057V31.1867C88.9856 31.1141 88.9773 31.0418 88.9631 30.9705V30.9216C88.9505 30.8675 88.934 30.8143 88.9139 30.7625L88.8893 30.7013C88.8647 30.6483 88.836 30.5994 88.8073 30.5504L88.7827 30.5137C88.7477 30.46 88.7079 30.4095 88.6638 30.3628L60.0632 0.383411C59.9483 0.262369 59.8097 0.16593 59.656 0.100004C59.5023 0.0340778 59.3367 5.09142e-05 59.1693 0L29.2361 0.0489439C29.069 0.0537774 28.9047 0.0924369 28.7531 0.162566C28.6015 0.232694 28.4659 0.33282 28.3545 0.456827L0.328035 30.3546C0.120936 30.5768 0.0040502 30.8674 0 31.1704V74.8098C0.000101666 75.1223 0.120404 75.4229 0.336236 75.65L26.3289 102.925L1.24243 103.011C0.916183 103.011 0.603293 103.14 0.372599 103.369C0.141904 103.599 0.0123008 103.91 0.0123008 104.234V146.042C0.0129846 146.344 0.125409 146.634 0.328035 146.858L28.2807 177.592L28.3053 177.617C28.3507 177.663 28.4001 177.705 28.4529 177.743L28.4939 177.776C28.5549 177.818 28.6194 177.855 28.6867 177.886L28.74 177.906L28.9081 177.959H28.9696C29.0436 177.976 29.1193 177.984 29.1951 177.984H59.1857C59.357 177.982 59.5261 177.945 59.6821 177.875C59.8382 177.805 59.9777 177.703 60.0919 177.576L88.6474 146.866C88.6884 146.821 88.7253 146.773 88.7622 146.724C88.7978 146.671 88.828 146.615 88.8524 146.556C88.8636 146.537 88.8732 146.516 88.8811 146.495C88.8811 146.442 88.9139 146.393 88.9262 146.34C88.9385 146.287 88.9262 146.303 88.9262 146.283C88.9393 146.212 88.9462 146.139 88.9467 146.067L88.9754 104.177C88.9756 104.098 88.9673 104.019 88.9508 103.941C88.9508 103.904 88.9262 103.867 88.918 103.827C88.9098 103.786 88.8975 103.753 88.8811 103.716C88.8644 103.677 88.8453 103.639 88.8237 103.602C88.8032 103.57 88.7909 103.537 88.7704 103.508C88.7499 103.48 88.7171 103.443 88.6925 103.41C88.6729 103.382 88.6509 103.354 88.6269 103.329L62.0806 76.0334H87.7453C87.9082 76.035 88.0698 76.0044 88.2208 75.9434C88.3717 75.8824 88.5089 75.7921 88.6245 75.6779C88.7401 75.5637 88.8317 75.4278 88.8941 75.2781C88.9564 75.1283 88.9882 74.9677 88.9877 74.8057ZM58.6445 2.4473L84.8873 29.9631H59.6942L32.1761 2.49216L58.6445 2.4473ZM2.49717 105.454L27.9691 105.364V145.981C27.9691 146.306 28.0987 146.617 28.3294 146.846C28.5601 147.076 28.873 147.205 29.1992 147.205C29.5255 147.205 29.8384 147.076 30.069 146.846C30.2997 146.617 30.4293 146.306 30.4293 145.981L30.4498 104.137C30.4518 104.108 30.4518 104.079 30.4498 104.051C30.4539 104.006 30.4539 103.961 30.4498 103.916C30.4448 103.881 30.4351 103.847 30.4211 103.814C30.4132 103.771 30.4008 103.729 30.3842 103.688C30.3703 103.653 30.3539 103.619 30.335 103.586C30.3145 103.549 30.2981 103.512 30.2735 103.476C30.2512 103.439 30.2251 103.405 30.1956 103.374C30.1751 103.349 30.1587 103.321 30.1341 103.296L2.46026 74.3325V31.668L29.2484 3.03872L57.9515 31.6925V73.582H30.4088L30.3801 31.097C30.3801 30.7724 30.2505 30.4612 30.0198 30.2317C29.7892 30.0022 29.4763 29.8733 29.15 29.8733C28.8238 29.8733 28.5109 30.0022 28.2802 30.2317C28.0495 30.4612 27.9199 30.7724 27.9199 31.097L27.9609 74.822C27.963 74.896 27.9712 74.9696 27.9855 75.0423C27.9984 75.1065 28.0176 75.1694 28.0429 75.2299C28.0429 75.2544 28.0634 75.2747 28.0716 75.2951C28.0921 75.3408 28.1168 75.3845 28.1454 75.4257L28.1823 75.4869C28.2171 75.5358 28.2555 75.5822 28.2971 75.6255L28.3176 75.65L57.9392 104.642V145.512L29.2074 174.953L2.46026 145.569L2.49717 105.454ZM60.4199 105.389H86.5438L86.5233 144.831L60.424 144.807L60.4199 105.389ZM58.6568 175.545H32.09L59.6942 147.258L84.9201 147.278L58.6568 175.545ZM84.875 102.941H59.6942L32.2212 76.0212H58.6732L84.875 102.941ZM60.4404 73.5739V32.4022H86.5561V73.5739H60.4404Z" fill="#F5F5F5" />
                    </svg>
                </div>

                <div className="space-y-8">
                    <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center justify-center overflow-visible py-8">
                        <div className="absolute inset-0 pointer-events-none">
                            <div className="relative h-full w-full pointer-events-auto">
                                <DraggableBadge initialOffset={{ x: 220, y: 150 }} rotationDeg={162} />
                            </div>
                        </div>

                        <div className="text-2xl font-light tracking-wide text-white sm:text-4xl lg:text-5xl">
                            <h3 className="whitespace-nowrap">
                                FROM CONCEPT TO <span className="font-extrabold">CREATION</span>
                            </h3>
                            <h3 className="mt-3 whitespace-nowrap">
                                LET&apos;S MAKE IT <span className="font-extrabold">HAPPEN!</span>
                            </h3>
                        </div>
                    </div>

                    <div>
                        <Magnet padding={100} disabled={false} magnetStrength={5} wrapperClassName="" innerClassName="">
                            <button className="group relative my-12 inline-flex items-center justify-between overflow-hidden rounded-full border-[rgba(66,66,66,0.3)] bg-[rgba(66,66,66,0.44)] shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[2.9px] transition-all duration-500 ease-in-out cursor-pointer hover:bg-[rgba(66,66,66,0.6)] active:scale-105 md:py-2.5 md:pl-5 md:pr-3">
                                <span className="z-10 px-4 text-white transition-colors duration-300 group-hover:text-black group-hover:scale-105">Get In Touch</span>
                                <span className="absolute inset-0 translate-x-[45%] scale-0 rounded-full bg-white opacity-0 transition-all duration-300 ease-in-out group-hover:translate-x-0 group-hover:scale-100 group-hover:opacity-100"></span>
                                <span className="z-10 flex items-center justify-center overflow-hidden rounded-full bg-white/80 p-3 transition-colors duration-300 group-hover:bg-transparent md:p-3.5">
                                    <ArrowRightIcon className="size-5 text-black" />
                                </span>
                            </button>
                        </Magnet>
                    </div>

                    <p className="text-base font-semibold text-white lg:text-2xl">
                        I&apos;m available for freelance projects.
                    </p>
                    <p className="text-sm tracking-wide text-white/80 lg:text-xl">
                        I thrive on crafting dynamic web applications and delivering seamless user experiences.
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Contact