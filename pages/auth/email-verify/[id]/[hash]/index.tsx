import * as React from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { Typography } from "components/common/typography";
import { Button } from "components/common/button/button";
import { InputPassword } from "components/common/form/input-password";
import { getSession, signIn } from "next-auth/client";
import { useRouter } from "next/router";
import { useToasts } from "react-toast-notifications";
import { Logo } from "components/logo";
import { GetServerSideProps } from "next";
import { InputEmail } from "components/common/form/input-email";
import { Icons } from "consts/icons";
import { Alert } from "components/common/alert2";
import { GenerateErrorToast } from "lib/helper";
import { AuthService } from "services";
import { Spinner } from "components/common/spinner/spinner";

const EmailVerify = () => {
  const router = useRouter();
  const { id, hash, expires, signature } = router.query;
  const { addToast } = useToasts();
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [isValid, setIsValid] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!router.isReady) return;

    const FinalData = {
      id: id,
      hash: hash,
      expires: expires,
      signature: signature,
    };
    console.log("FinalData", FinalData);
    AuthService.confirmationEmail(FinalData)
      .then((response) => {
        addToast("Su correo ha sido confirmado exitosamente", {
          appearance: "success",
        });
        console.log("response confirmacion correo:", response);
        setIsValid(true);
        setIsLoading(false);
      })
      .catch((e: any) => {
        console.log("Error: ", e);
        GenerateErrorToast(e, addToast);
        setIsValid(false);
        setIsLoading(false);
      });
  }, [router.isReady]);

  return (
    <>
      <div className="container-auth bg-primary">
        <div className="rounded-2xl center flex flex-col items-center justify-center box w-full m-auto bg-white">
          {isLoading ? (
            <Spinner type="loadingPage" className="py-10" />
          ) : (
            <>
              <Logo
                className="mb-4"
                type="withColor"
                classNameImg="max-w-[302px]"
              />
              {isValid ? (
                <div className="mb-9 mt-10 flex w-full flex-auto">
                  <Alert title="COMPLETADO" type="success">
                    <p>Su correo ha sido verificado exitosamente.</p>
                  </Alert>
                </div>
              ) : (
                <div className="mb-9 mt-10 flex w-full flex-auto">
                  <Alert title="ERROR" type="error">
                    <p>No se ha podido verificar el correo electrónico.</p>
                  </Alert>
                </div>
              )}

              <div className="container-button mt-6 justify-center flex items-center max-w-[200px] mx-auto w-full">
                <Button
                  labelProps="f-18 font-normal"
                  label={"Ir al inicio"}
                  fill
                  boderRadius="rounded-full"
                  size="full"
                  type="submit"
                  sizesButton="py-3"
                  href="/auth/signin"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default EmailVerify;
