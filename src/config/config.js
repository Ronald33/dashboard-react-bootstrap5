import api from "@/services/api";

import ErrorMessage from "@/lib/ErrorMessage";
import MyErrorMessage from "@/components/MyErrorMessage";

import GlobalLoader from '@/lib/GlobalLoader';
import MyLoader from "@/components/MyLoader";

import HttpErrorHandler from '@/lib/httpErrorHandler';

import HelpersUI from "@/utils/HelpersUI";

import FormError from '@/lib/FormError';
import MyFormError from "@/components/MyFormError";

ErrorMessage.setComponent(MyErrorMessage);

GlobalLoader.registerApi(api);
GlobalLoader.setLoader(MyLoader);

HttpErrorHandler.registerApi(api);
HttpErrorHandler.setTrigger((error) =>
{
    const status = error.response?.status ?? error.status
    if(status === 400) { return; }
    HelpersUI.toast.error("Ocurrió un error realizando la petición.");
});

FormError.registerApi(api);
FormError.setComponent(MyFormError);