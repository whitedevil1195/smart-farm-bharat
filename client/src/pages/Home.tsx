import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf, ShieldCheck, Smartphone, Mic, CloudRain } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const features = [
    {
      icon: Leaf,
      title: "Disease Detection",
      desc: "Upload a photo of your crop to instantly identify diseases and get treatment advice.",
      color: "text-emerald-600 bg-emerald-100",
    },
    {
      icon: Mic,
      title: "Voice Assistant",
      desc: "Speak your problems in your local language and get instant solutions from AI.",
      color: "text-blue-600 bg-blue-100",
    },
    {
      icon: ShieldCheck,
      title: "Smart Treatment",
      desc: "Get chemical and organic treatment suggestions tailored to your specific crop issues.",
      color: "text-amber-600 bg-amber-100",
    },
  ];

  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-primary/5 border border-primary/10 p-8 md:p-16 text-center lg:text-left">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl opacity-50" />

        <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-border shadow-sm mb-6">
              <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">AI Powered Farming</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-foreground leading-tight mb-6">
              Smart Farming for <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Bharat</span>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Empowering farmers with AI-driven insights. Detect crop diseases instantly and get voice-guided solutions in seconds.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Link href="/detect">
                <Button size="lg" className="w-full sm:w-auto h-12 px-8 text-lg rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-0.5 transition-all">
                  <Leaf className="mr-2 h-5 w-5" />
                  Check Crop Health
                </Button>
              </Link>
              <Link href="/voice">
                <Button variant="outline" size="lg" className="w-full sm:w-auto h-12 px-8 text-lg rounded-xl bg-white hover:bg-secondary/50 border-2">
                  <Mic className="mr-2 h-5 w-5" />
                  Speak to AI
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            {/* Abstract visual representation of scanning */}
            <div className="relative aspect-square max-w-md mx-auto bg-gradient-to-br from-green-100 to-emerald-50 rounded-3xl border border-white/50 shadow-2xl p-6 flex items-center justify-center overflow-hidden">
               {/* Unsplash image of healthy crops */}
               {/* healthy crops farming agriculture */}
               <img 
                 src="https://pixabay.com/get/g9717b15c1a76c36fb20353b5565121eeaa4e54672bdd77e7a581c2ee864f562edc8be45abca7dccfac0fd99ea3d6478f823d4c5148e4bb3ac45083d9a611ec86_1280.jpg" 
                 alt="Healthy Crops" 
                 className="absolute inset-0 w-full h-full object-cover opacity-80"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
               
               <div className="relative z-10 w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 text-white">
                 <div className="flex items-center justify-between mb-4">
                   <div className="flex items-center gap-2">
                     <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                     <span className="text-sm font-medium">System Active</span>
                   </div>
                   <span className="text-xs bg-white/20 px-2 py-1 rounded">98% Accuracy</span>
                 </div>
                 <div className="space-y-2">
                   <div className="h-2 bg-white/20 rounded-full w-3/4" />
                   <div className="h-2 bg-white/20 rounded-full w-1/2" />
                 </div>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-bold text-foreground">How It Helps You</h2>
          <p className="text-muted-foreground mt-2">Modern technology simplified for everyday farming</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card hover:bg-card/50 border border-border/50 hover:border-primary/20 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold font-display mb-3 group-hover:text-primary transition-colors">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="bg-foreground text-background rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-3xl font-display font-bold mb-4">Ready to improve your yield?</h2>
          <p className="text-white/70 mb-8 text-lg">Join thousands of farmers using AI to protect their crops and increase productivity.</p>
          <Link href="/detect">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 h-12 px-8 text-lg font-bold rounded-xl">
              Start Diagnosis Free <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
        
        {/* Decorative circles */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </section>
    </div>
  );
}
