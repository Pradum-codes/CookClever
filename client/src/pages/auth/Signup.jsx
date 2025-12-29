import { useState } from "react";
import signup from "@/api/signup";  // Your newly refactored service
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ChefHat, Eye, EyeOff, Mail, Lock, User, AlertCircle, CheckCircle } from "lucide-react"

const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const validateForm = () => {
        if (!username || !email || !password || !confirmPassword) {
            return "Please fill in all fields";
        }

        if (username.length < 3) {
            return "Username must be at least 3 characters long";
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            return "Please enter a valid email address";
        }

        if (password.length < 6) {
            return "Password must be at least 6 characters long";
        }

        if (password !== confirmPassword) {
            return "Passwords do not match";
        }

        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const validationError = validateForm()
        if (validationError) {
            setError(validationError);
            return;
        }

        setIsLoading(true);

        try {
            const response = await signup({ username, email, password });
            setIsLoading(false);
            navigate("/dashboard");
        } catch (err) {
            setIsLoading(false);
            console.error("Signup failed:", err);
            setError(err.message || "Signup failed. Try again.");
        }
    }

    const getPasswordStrength = (password) => {
        if (password.length === 0) return null
        if (password.length < 6) return { text: "Weak", color: "text-red-500" }
        if (password.length < 10) return { text: "Medium", color: "text-yellow-500" }
        return { text: "Strong", color: "text-green-500" }
    }

    const passwordStrength = getPasswordStrength(password)

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-orange-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-red-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>

            <Card className="w-full max-w-md relative z-10 shadow-2xl border-border bg-card/80 backdrop-blur-md">
                <CardHeader className="text-center pb-6">
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary shadow-lg">
                        <ChefHat className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-3xl font-bold text-foreground">
                        Join CookClever
                    </CardTitle>
                    <CardDescription className="text-lg text-muted-foreground mt-2">
                        Create your account to start your culinary journey
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                    {error && (
                        <Alert variant="destructive" className="border-red-200 bg-red-50">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="username" className="text-sm font-medium text-foreground">
                                Username
                            </Label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    id="username"
                                    type="text"
                                    placeholder="Enter Username "
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="pl-10 h-12 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                                    required
                                />
                                {username.length >= 3 && (
                                    <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                                Email Address
                            </Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-10 h-12 border-input focus:ring-primary"
                                    required
                                />
                                {/\S+@\S+\.\S+/.test(email) && (
                                    <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                                Password
                            </Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Create a password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-10 pr-10 h-12 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                            {passwordStrength && (
                                <p className={`text-xs ${passwordStrength.color} font-medium`}>
                                    Password strength: {passwordStrength.text}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                                Confirm Password
                            </Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm your password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="pl-10 pr-10 h-12 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                            {confirmPassword && password !== confirmPassword && (
                                <p className="text-xs text-red-500 font-medium">
                                    Passwords do not match
                                </p>
                            )}
                            {confirmPassword && password === confirmPassword && confirmPassword.length > 0 && (
                                <p className="text-xs text-green-500 font-medium">
                                    Passwords match ✓
                                </p>
                            )}
                        </div>

                        <div className="space-y-4">
                            <label className="flex items-start space-x-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="mt-1 rounded border-gray-300 focus:ring-orange-500"
                                    required
                                />
                                <span className="text-sm text-gray-600 leading-relaxed">
                                    I agree to the{" "}
                                    <Link to="/terms" className="text-orange-600 hover:text-orange-700 font-medium">
                                        Terms of Service
                                    </Link>{" "}
                                    and{" "}
                                    <Link to="/privacy" className="text-orange-600 hover:text-orange-700 font-medium">
                                        Privacy Policy
                                    </Link>
                                </span>
                            </label>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-12 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold text-lg shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Creating Account...
                                </div>
                            ) : (
                                "Create Account"
                            )}
                        </Button>
                    </form>

                    <div className="text-center">
                        <p className="text-gray-600">
                            Already have an account?{" "}
                            <Link to="/login" className="text-orange-600 hover:text-orange-700 font-semibold">
                                Sign in here
                            </Link>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default Signup;