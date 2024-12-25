import { inject } from 'vue';

export function useDialog() {
    const dialogService = inject('dialogService');
    if (!dialogService) {
        throw new Error('Dialog service not provided!');
    }
    return dialogService;
}