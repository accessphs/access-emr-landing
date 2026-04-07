import { StyleText } from './Hero'
import { Appointment, Insurance, Management, Records, Secure, Workflow } from './Icons'

// FeatureCard.tsx
type FeatureCardProps = {
  title: string
  description: string
  icon: React.ReactNode // pass an SVG or img
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }: FeatureCardProps) => (
  <article className="group flex flex-col gap-5 rounded-lg border border-[#D9D9D9] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg">
    <div className="mx-3 mt-3 flex h-[132px] items-center justify-center rounded-lg border border-[#D9D9D9] bg-[#F7F9F6] p-6 sm:mx-3.5 sm:h-[150px] sm:p-8 md:h-[166px]">
      <div className="inline-flex items-center justify-center rounded-xl p-3 transition-transform duration-300 group-hover:scale-105">
        {icon}
      </div>
    </div>

    <div className="flex flex-1 flex-col gap-3 p-6">
      <h3 className="text-xl font-medium text-gray-900">{title}</h3>
      <p className="text-sm leading-relaxed text-gray-600">{description}</p>
    </div>
  </article>
)

const features = [
  {
    description:
      'Access complete medical history, labs, prescriptions, and encounters in one place. Reduce duplication and make transitions between departments seamless.',
    icon: Records,
    title: 'Centralized Patient Records'
  },
  {
    description:
      'Tailored dashboards for every role. Streamlined access to vitals, medication administration, and monitoring to cut down on errors.',
    icon: Workflow,
    title: 'Doctor & Nurse Workflow'
  },
  {
    description:
      'Track medications, supplies, and automate stock alerts. Manage inventory in real time and prevent stockouts or expiry issues.',
    icon: Management,
    title: 'Pharmacy & Inventory Mgmt.'
  },
  {
    description:
      'Smarter booking with reminders for patients and staff. Patients can easily book or reschedule appointments, while staff stay updated with automated notifications. This reduces no-shows, keeps schedules organized, and ensures better time management for providers.',
    icon: Appointment,
    title: 'Appointment & Scheduling'
  },
  {
    description:
      'Generate invoices, process claims, and reduce errors.From consultation fees to insurance claims, everything is tracked and automated. Integrated billing reduces administrative headaches, minimizes errors, and speeds up payment cycles for both patients and providers.',
    icon: Insurance,
    title: 'Billing & Insurance Integration'
  },
  {
    description:
      'HIPAA/GDPR-ready, with audit trails and role-based access. Sensitive data stays protected with enterprise-level security. Every action is logged for accountability, and access can be limited by role — giving peace of mind that patient confidentiality and compliance requirements are fully met.',
    icon: Secure,
    title: 'Secure & Compliant'
  }
]

const Features = () => {
  return (
    <div className="bg-white" id="features">
      <div className="mx-auto my-16 flex max-w-[1122px] flex-col gap-12 px-4 sm:my-24 sm:gap-16 sm:px-6 md:my-32 md:gap-20 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-3 text-center sm:gap-5">
          <StyleText className="text-2xl uppercase sm:text-3xl md:text-[40px]">
            KEY FEATURES
          </StyleText>
          <p className="text-lg font-light text-[#6B6161] sm:text-xl md:text-2xl">
            Built for safety and efficiency
          </p>
        </div>
        <section className="mx-auto grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {features?.map(({ description, icon: Icon, title }) => (
            <FeatureCard description={description} icon={<Icon />} key={title} title={title} />
          ))}
        </section>
      </div>
    </div>
  )
}

export default Features
