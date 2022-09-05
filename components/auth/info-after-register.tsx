import * as React from "react";
import { Logo } from "components/logo";
import { Alert } from "components/common/alert2";
import { Button } from "components/common/button";

const InfoAfterRegister = () => {
  return (
    <>
      <div className="container-auth bg-primary">
        <div className="rounded-2xl center flex flex-col items-center justify-center box w-full m-auto bg-white">
          <Logo
            className="mb-4"
            type="withColor"
            classNameImg="max-w-[302px]"
          />

          <div className="mb-9 mt-10 flex w-full flex-auto">
            <Alert title="INFORMACIÓN" type="info">
              <p>
                Se ha enviado un correo electronico para la confirmación de su
                cuenta
              </p>
            </Alert>
          </div>

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
        </div>
      </div>
    </>
  );
};

export default InfoAfterRegister;
