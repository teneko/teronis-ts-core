// import swal, { SweetAlertOptions } from 'sweetalert2';

// export class SwalUtilities {
//     private static lockedSwalMixin: typeof swal = swal.mixin({
//         allowOutsideClick: false,
//         allowEscapeKey: false,
//     });

//     private static warningSwalMixin: typeof swal = swal.mixin({
//         showCancelButton: true,
//         focusCancel: true,
//         type: "warning",
//     });

//     private constructor() { }

//     public static getLockedSwalMixin() {
//         return SwalUtilities.lockedSwalMixin;
//     }

//     public static showLoadingSwal(settings: SweetAlertOptions) {
//         SwalUtilities.getLockedSwalMixin().fire(settings);
//         swal.showLoading();
//     }

//     public static getWarningSwalMixin() {
//         return SwalUtilities.warningSwalMixin;
//     }
// }