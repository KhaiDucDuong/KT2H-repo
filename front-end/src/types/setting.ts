import { z } from "zod";

export interface PrivacySetting {
    use_bad_word_filter: boolean;
  }

export interface Setting {
    privacy_setting: PrivacySetting
}

export const privacySettingSchema: z.ZodType<PrivacySetting> = z.object({
  use_bad_word_filter: z.boolean()
});

export const settingSchema: z.ZodType<Setting> = z.object({
  privacy_setting: privacySettingSchema
});
