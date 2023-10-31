import Swal, { type SweetAlertIcon, type SweetAlertResult } from 'sweetalert2'
interface SweetAlerConfirmProps {
  title: string
  text: string
  icon: SweetAlertIcon
  confirmButtonText: string
  titleFire: string
  bodyFire: string
  iconFire: SweetAlertIcon
  showCancelButton: boolean
}
export const SweetAlertConfirm = async ({ title, text, icon, confirmButtonText, titleFire, bodyFire, iconFire, showCancelButton }: SweetAlerConfirmProps): Promise<SweetAlertResult> => {
  return await Swal.fire({
    title,
    text,
    icon,
    showCancelButton: showCancelButton,
    confirmButtonColor: '#2563eb',
    cancelButtonColor: '#ff2100',
    confirmButtonText,
  }).then((result) => {
    if (result.isConfirmed) {
      void Swal.fire(
        `${titleFire}`,
        `${bodyFire}`,
        `${iconFire}`
      )
    }
    return result
  })
}
