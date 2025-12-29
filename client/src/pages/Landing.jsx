import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChefHat, Search, Heart, BookOpen, ArrowRight, Utensils } from "lucide-react";

export default function Landing() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            {/* Navigation */}
            <header className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-xl text-orange-600">
                        <div className="bg-orange-600 text-white p-1.5 rounded-lg">
                            <ChefHat className="h-6 w-6" />
                        </div>
                        CookClever
                    </div>
                    <div className="flex items-center gap-4">
                        <Link to="/login">
                            <Button variant="ghost">Sign In</Button>
                        </Link>
                        <Link to="/signup">
                            <Button>Get Started</Button>
                        </Link>
                    </div>
                </div>
            </header>

            <main className="flex-1">
                {/* Hero Section */}
                <section className="py-20 md:py-32 px-4 relative overflow-hidden">
                    <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
                    <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-orange-500/20 opacity-20 blur-[100px]"></div>

                    <div className="container mx-auto text-center max-w-4xl space-y-8">
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight lg:text-7xl">
                            Master Your Kitchen with <span className="text-orange-600">CookClever</span>
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                            Discover delicious recipes based on what's in your pantry. Save your favorites, track your cooking history, and eat smarter every day.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                            <Link to="/signup" className="w-full sm:w-auto">
                                <Button size="lg" className="w-full h-12 px-8 text-lg gap-2 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 border-0">
                                    Start Cooking Now <ArrowRight className="h-5 w-5" />
                                </Button>
                            </Link>
                            <Link to="/login" className="w-full sm:w-auto">
                                <Button size="lg" variant="outline" className="w-full h-12 px-8 text-lg">
                                    I have an account
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-20 bg-muted/50">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12">Everything You Need</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <FeatureCard
                                icon={<Search className="h-10 w-10 text-orange-600" />}
                                title="Smart Search"
                                description="Find recipes based on ingredients you already have in your kitchen."
                            />
                            <FeatureCard
                                icon={<Heart className="h-10 w-10 text-red-500" />}
                                title="Save Favorites"
                                description="Build your personal cookbook by saving recipes you love."
                            />
                            <FeatureCard
                                icon={<BookOpen className="h-10 w-10 text-blue-500" />}
                                title="Recipe History"
                                description="Keep track of what you've cooked and revisit past meals."
                            />
                            <FeatureCard
                                icon={<Utensils className="h-10 w-10 text-green-500" />}
                                title="Nutrition Facts"
                                description="Get detailed nutritional information for every recipe."
                            />
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 px-4">
                    <div className="container mx-auto max-w-4xl">
                        <Card className="bg-gradient-to-r from-orange-600 to-red-600 text-white overflow-hidden relative border-0">
                            <CardContent className="p-12 text-center space-y-6 relative z-10">
                                <h2 className="text-3xl md:text-4xl font-bold">Ready to Elevate Your Cooking?</h2>
                                <p className="text-white/90 text-lg max-w-2xl mx-auto">
                                    Join thousands of home chefs who are discovering new flavors and reducing food waste with CookClever.
                                </p>
                                <Link to="/signup" className="inline-block">
                                    <Button size="lg" variant="secondary" className="h-14 px-8 text-lg font-semibold">
                                        Create Free Account
                                    </Button>
                                </Link>
                            </CardContent>
                            {/* Decorative circles */}
                            <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                            <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                        </Card>
                    </div>
                </section>
            </main>

            <footer className="border-t py-8 bg-muted/30">
                <div className="container mx-auto px-4 text-center text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} CookClever. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

function FeatureCard({ icon, title, description }) {
    return (
        <Card className="border-none shadow-md bg-background hover:shadow-lg transition-shadow duration-300">
            <CardContent className="pt-6 text-center space-y-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                    {icon}
                </div>
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                    {description}
                </p>
            </CardContent>
        </Card>
    );
}
