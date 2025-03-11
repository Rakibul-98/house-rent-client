import WelcomePage from '@/components/modules/dashboard/content/WelcomePage'
import { FileText, View } from 'lucide-react'
import React from 'react'

export default function OwnerHomePage() {

  const content = {
      title: "Manage Your Properties",
      description: "Create, update, and manage your property listings. Track requests and approvals.",
      actions: [
        {
          icon: <FileText  />,
          title: "Create Listing",
          description: "Add a new property to your listings."
        },
        {
          icon: <View  />,
          title: "Manage Requests",
          description: "See all your property listings and their status.",
        },
      ],
    }

  return (
    <div>
      <WelcomePage content={content}/>
    </div>
  )
}
