import swal, { SweetAlertOptions } from "sweetalert2";

export type SweetAlertSwalOptions = SweetAlertOptions | { useRejections?: false | undefined };

export class SwalUtilities {
    private static lockedSwalMixin: typeof swal = swal.mixin({
        allowOutsideClick: false,
        allowEscapeKey: false,
    });

    private static warningSwalMixin: typeof swal = swal.mixin({
        showCancelButton: true,
        focusCancel: true,
        type: "warning",
    });

    private constructor() { }

    public static showLoadingSwal(settings: SweetAlertSwalOptions) {
        this.getLockedSwalMixin()(settings);
        swal.showLoading();
    }

    public static getLockedSwalMixin() {
        return this.lockedSwalMixin;
    }

    public static getWarningSwalMixin() {
        return this.warningSwalMixin;
    }
}