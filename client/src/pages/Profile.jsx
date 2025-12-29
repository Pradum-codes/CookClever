import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Mail, User, Shield, LogOut } from "lucide-react";

export default function Profile() {
    const { user, logout } = useContext(AuthContext);

    if (!user) {
        return <div className="p-8 text-center text-muted-foreground">Please log in to view your profile.</div>;
    }

    const getInitial = (name) => (name ? name.trim()[0].toUpperCase() : '?');

    return (
        <div className="container mx-auto max-w-2xl px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-foreground">My Profile</h1>

            <Card className="mb-8 border-border bg-card shadow-sm">
                <CardHeader className="flex flex-col sm:flex-row items-center gap-6 pb-8 border-b border-border">
                    <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
                        <AvatarImage src={user.avatarUrl} alt={user.username} />
                        <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                            {getInitial(user.username)}
                        </AvatarFallback>
                    </Avatar>
                    <div className="text-center sm:text-left space-y-1">
                        <CardTitle className="text-2xl">{user.username}</CardTitle>
                        <CardDescription className="text-lg">{user.email}</CardDescription>
                        <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
                            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">
                                Free Plan
                            </span>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="pt-8 space-y-6">
                    <div className="grid gap-4">
                        <div className="flex items-center p-4 rounded-lg bg-muted/50 border border-border">
                            <User className="h-5 w-5 text-muted-foreground mr-4" />
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Username</p>
                                <p className="font-medium">{user.username}</p>
                            </div>
                        </div>

                        <div className="flex items-center p-4 rounded-lg bg-muted/50 border border-border">
                            <Mail className="h-5 w-5 text-muted-foreground mr-4" />
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Email Address</p>
                                <p className="font-medium">{user.email}</p>
                            </div>
                        </div>

                        <div className="flex items-center p-4 rounded-lg bg-muted/50 border border-border">
                            <Shield className="h-5 w-5 text-muted-foreground mr-4" />
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Account Availability</p>
                                <p className="font-medium text-green-600">Active</p>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                        <Button variant="destructive" onClick={logout} className="gap-2">
                            <LogOut className="h-4 w-4" />
                            Logout
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
