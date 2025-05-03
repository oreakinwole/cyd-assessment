'use client'

export default function Signin() {
    return (
        <div>
            <div className="flex justify-center items-center text-foreground bg-foreground/[0.02] min-h-[90vh] px-4 py-6">
                <div className="bg-background p-4 sm:p-7 rounded-2xl my-4 sm:my-8 shadow-md w-full max-w-[450px]">
                    <div className="flex flex-col justify-center items-center text-xl sm:text-2xl font-semibold mb-4">
                        <p>Welcome</p>
                        <p className="text-xs sm:text-sm font-normal">Sign in to continue</p>
                    </div>
                    <form>
                        <div className="flex flex-col font-semibold text-sm text-foreground/70 my-4">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                className="p-3 my-2 text-foreground/70 text-xs border-2 bg-foreground/5 rounded-[0.6rem]"
                                id="email"
                                name="email"
                                placeholder="Enter Email"
                            />
                        </div>
                        <div className="flex flex-col font-semibold text-sm text-foreground/70 my-4">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                className="p-3 my-2 text-foreground/70 text-xs border-2 bg-foreground/5 rounded-[0.6rem]"
                                id="password"
                                name="password"
                                placeholder="Enter Password"
                            />
                        </div>
                        <div className="flex flex-col justify-center items-center gap-3 font-semibold text-sm text-foreground/70 my-4">
                            <button type="submit" className="bg-primary w-full p-2.5 rounded-[0.6rem] my-1 text-background text-sm">
                                Continue
                            </button>
                            <p className="text-foreground/50 text-xs sm:text-sm font-medium">
                                Don&apos;t have an account?
                                <a href="/signup">
                                    <span className="text-foreground underline"> Sign up</span>
                                </a>
                            </p>
                        </div>
                    </form>
                    <div className="flex justify-center items-center my-3">
                        <div className="w-full h-3 border-t border-foreground opacity-15"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
