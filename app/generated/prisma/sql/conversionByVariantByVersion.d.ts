import * as $runtime from "../runtime/library"

/**
 * @param int4
 */
export const conversionByVariantByVersion: (int4: number) => $runtime.TypedSql<conversionByVariantByVersion.Parameters, conversionByVariantByVersion.Result>

export namespace conversionByVariantByVersion {
  export type Parameters = [int4: number]
  export type Result = {
    variant: string
    conversion: number | null
  }
}
