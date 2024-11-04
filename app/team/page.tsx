import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Footer from '@/components/Footer/Footer'
import Navbar from '@/components/Navbar/Navbar'

import Rahul from "./image/Rahul.jpg"

import { StaticImageData } from 'next/image'

type TeamMember = {
  name: string
  role: string
  image: string | StaticImageData
}

const teamMembers: TeamMember[] = [
  { name: "Edwin C Shony", role: "Member", image: "/placeholder.svg?height=400&width=400" },
  { name: "Gopikrishna K M", role: "Member", image: "/placeholder.svg?height=400&width=400" },
  { name: "Rahul A B", role: "Member", image: Rahul },
  { name: "Sreerag Sreekanth", role: "Member", image: "/placeholder.svg?height=400&width=400" }
]
  
const projectGuide: TeamMember = {
  name: "Mrs. Geethu Wilson",
  role: "Project Guide",
  image: "/placeholder.svg?height=400&width=400"
}

export default function components() {
  return (
    <section className="bg-background">
      <div className="fixed w-full z-20">
        <Navbar />
      </div>
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {teamMembers.map((member) => (
            <Card key={member.name} className="flex flex-col justify-between">
              <CardHeader>
                <Image
                  src={member.image}
                  alt={member.name}
                  width={400}
                  height={450}
                  className="rounded-full w-32 h-32 mx-auto mb-4"
                />
                <CardTitle className="text-xl text-center">{member.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">{member.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="max-w-3xl mx-auto mb-8">
          <Card>
            <CardHeader>
              <Image
                src={projectGuide.image}
                alt={projectGuide.name}
                width={400}
                height={400}
                className="rounded-full w-40 h-40 mx-auto mb-4"
              />
              <CardTitle className="text-2xl text-center">{projectGuide.name}</CardTitle>
              <p className="text-muted-foreground text-center">{projectGuide.role}</p>
            </CardHeader>
            <CardContent>
              <p className="text-lg mb-4">
                As our project guide, Mrs. Geethu Wilson brings over 15 years of experience in renewable energy projects. She oversees the entire project lifecycle, ensuring seamless integration of our team&apos;s diverse skills and adherence to sustainability goals.
              </p>
              <p className="text-lg mb-4">
                Mrs. Wilson&apos;s expertise includes:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>Strategic project planning and execution</li>
                <li>Stakeholder management and communication</li>
                <li>Regulatory compliance and environmental impact assessment</li>
                <li>Innovation in sustainable energy solutions</li>
              </ul>
            </CardContent>
          </Card>
        </div>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg">
            Our team, led by Mrs. Wilson&apos;s expert guidance, is committed to revolutionizing the energy sector. We combine cutting-edge technology with sustainable practices to create innovative solutions that power a greener future. Together, we&apos;re not just meeting energy needs; we&apos;re shaping a sustainable world for generations to come.
          </p>
        </div>
      </div>
      <Footer />
    </section>
  )
}
