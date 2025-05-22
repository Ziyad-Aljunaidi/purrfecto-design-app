import { ImageIcon } from "lucide-react"
export default function ShotAttachmentLoading(){
  return(
  <div className="max-w-3xl w-full mx-auto  py-4">
  <div className="max-w-3xl animate-pulse aspect-square w-full bg-muted/50 rounded-lg flex items-center justify-center">
    <ImageIcon className="h-10 w-10 opacity-25" />
  </div>
  </div> 
  )
}