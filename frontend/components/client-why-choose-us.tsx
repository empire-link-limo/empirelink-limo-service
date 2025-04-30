"use client"

import { motion } from "framer-motion"
import { Award, Shield, Users } from "lucide-react"
import { BenefitItem } from "@/lib/types"

interface ClientWhyChooseUsProps {
  title: string;
  description?: string;
  benefits: BenefitItem[];
}

export function ClientWhyChooseUs({ title, description, benefits }: ClientWhyChooseUsProps) {
  // If we have benefits from CMS, use those, otherwise use defaults
  const displayBenefits = benefits.length > 0 ? benefits : [
    {
      icon: "Award",
      title: "Premium Fleet",
      description: "Our meticulously maintained vehicles represent the pinnacle of luxury and comfort, ensuring an exceptional travel experience."
    },
    {
      icon: "Users",
      title: "Professional Chauffeurs",
      description: "Our chauffeurs are professionally trained, background-checked, and committed to providing discreet, exceptional service."
    },
    {
      icon: "Shield",
      title: "Reliability",
      description: "With a 99.8% on-time rate, we understand that punctuality is non-negotiable in the corporate world."
    }
  ];
  
  // Map icon names to components
  const getIconComponent = (iconName: string | undefined) => {
    switch (iconName) {
      case "Award": return <Award className="h-12 w-12 text-gold" />
      case "Shield": return <Shield className="h-12 w-12 text-gold" />
      case "Users": return <Users className="h-12 w-12 text-gold" />
      default: return <Award className="h-12 w-12 text-gold" />
    }
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <div className="h-1 w-20 bg-gold mx-auto mb-6"></div>
        <p className="text-gray-300 max-w-2xl mx-auto">{description}</p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {displayBenefits.map((benefit, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="bg-gray-900 p-8 rounded-lg border border-gray-800 text-center"
          >
            <div className="flex justify-center mb-6">
              {getIconComponent(benefit.icon)}
            </div>
            <h3 className="text-xl font-bold mb-4">{benefit.title}</h3>
            <p className="text-gray-400">
              {benefit.description}
            </p>
          </motion.div>
        ))}
      </div>
    </>
  )
}