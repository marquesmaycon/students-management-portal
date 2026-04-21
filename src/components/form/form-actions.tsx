import { ArrowLeft, RotateCcw, Save } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { Link } from "react-router";

import { Button } from "../ui/button";
import { DestroyButton } from "./destroy-button";

type FormActionsProps = {
  isMutating?: boolean;
  backLink: string;
  destroy?: () => Promise<void>;
};

export function FormActions({
  isMutating,
  backLink,
  destroy,
}: FormActionsProps) {
  const form = useFormContext();
  return (
    <div className="mt-auto flex gap-2">
      <Button type="button" variant="outline" asChild>
        <Link to={backLink}>
          <ArrowLeft /> Voltar
        </Link>
      </Button>

      <Button
        type="button"
        variant="secondary"
        onClick={() => form.reset()}
        disabled={isMutating}
        className="mr-auto"
      >
        <span className="hidden sm:inline">Resetar</span> <RotateCcw />
      </Button>

      {destroy && (
        <DestroyButton
          destroy={() => destroy?.()}
          title="Excluir curso"
          disabled={isMutating}
          className="[&>span]:hidden sm:[&>span]:inline"
        />
      )}

      <Button type="submit" loading={isMutating}>
        Salvar <Save />
      </Button>
    </div>
  );
}
