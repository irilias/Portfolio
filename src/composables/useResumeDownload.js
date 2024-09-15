
import { error } from '../utils/logger';
export function useResumeDownload() {

  const downloadResume = async (currentLanguage) => {
    try {
      const filename = currentLanguage.value === 'FR' 
      ? import.meta.env.VITE_RESUME_FILENAME_FR 
      : import.meta.env.VITE_RESUME_FILENAME_EN;

      const response = await fetch(`/resumes/${filename}`)
      
      if (!response.ok) {
        error('Resume file not found');
      }
      
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)

      return { success: true }
    } catch (err) {
      error('Failed to download resume:', err);
      return { success: false, error: error.message }
    }
  }

  return { downloadResume }
}
