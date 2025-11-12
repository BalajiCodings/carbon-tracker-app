import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Zap, Leaf, TrendingDown, Users } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30">
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-foreground">EcoTrack</span>
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link to="/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      <main>
        <section className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground">
              Track Your Energy,
              <span className="text-primary"> Save the Planet</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Monitor your household energy consumption, reduce your carbon footprint, 
              and make sustainable choices with our comprehensive energy management platform.
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <Button size="lg" asChild>
                <Link to="/register">Start Tracking Free</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/resources">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-3 p-6 rounded-lg bg-card border">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground">Device Monitoring</h3>
              <p className="text-muted-foreground">
                Track energy usage of all your household devices and appliances in real-time.
              </p>
            </div>

            <div className="text-center space-y-3 p-6 rounded-lg bg-card border">
              <div className="mx-auto w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
                <TrendingDown className="h-6 w-6 text-success" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground">Carbon Reduction</h3>
              <p className="text-muted-foreground">
                Get insights and tips to reduce your carbon emissions and energy costs.
              </p>
            </div>

            <div className="text-center space-y-3 p-6 rounded-lg bg-card border">
              <div className="mx-auto w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground">Family Awareness</h3>
              <p className="text-muted-foreground">
                Educational resources to help your entire household make sustainable choices.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-primary/5 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Ready to Make a Difference?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of households reducing their environmental impact. 
              Start tracking your energy usage today.
            </p>
            <Button size="lg" asChild>
              <Link to="/register">Create Free Account</Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 EcoTrack. Making sustainable living accessible.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
