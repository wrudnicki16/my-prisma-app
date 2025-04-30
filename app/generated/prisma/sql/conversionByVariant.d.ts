import * as $runtime from "../runtime/library"

/**
 */
export const conversionByVariant: () => $runtime.TypedSql<conversionByVariant.Parameters, conversionByVariant.Result>

export namespace conversionByVariant {
  export type Parameters = []
  export type Result = {
    variant: string
    conversion: number | null
  }
}
