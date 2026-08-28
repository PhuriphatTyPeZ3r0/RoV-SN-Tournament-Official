import { Router } from 'express';
import { z } from 'zod';
import { action } from '../actionHandler';
import { requireAdmin } from '../requireAdmin';

const router = Router();

const colorHexSchema = z
  .string()
  .regex(/^#[0-9A-F]{6}$/i, 'รหัสสีต้องเป็น Hex Code ขึ้นต้นด้วย # ตามด้วยเลขฐานสิบหก 6 หลัก (เช่น #15C8FF)');

const themeValidationSchema = z.object({
  id: z
    .string()
    .min(1, 'ไอดีธีมต้องไม่ว่างเปล่า')
    .regex(/^[a-z0-9-]+$/, 'ไอดีต้องเป็นภาษาอังกฤษพิมพ์เล็ก ตัวเลข หรือเครื่องหมาย - เท่านั้น'),
  name: z.string().min(1, 'ชื่อธีมต้องไม่ว่างเปล่า'),
  description: z.string().nullable().optional(),
  primary_color: colorHexSchema,
  secondary_color: colorHexSchema,
  bg_deep: colorHexSchema,
  bg_surface: colorHexSchema,
  primary_light: colorHexSchema,
  primary_dark: colorHexSchema,
});

// GET /themes — getThemesAction
router.get(
  '/themes',
  action(async (supabase) => {
    const { data, error } = await supabase
      .from('themes')
      .select('*')
      .order('created_at', { ascending: true });
    if (error) throw new Error(`Failed to fetch themes: ${error.message}`);
    return data;
  }),
);

// POST /themes — createThemeAction (admin only)
router.post(
  '/themes',
  action(async (supabase, token, req) => {
    await requireAdmin(supabase, token);

    const validated = themeValidationSchema.safeParse(req.body);
    if (!validated.success) throw new Error(validated.error.issues[0].message);

    const { data, error } = await supabase
      .from('themes')
      .insert({ ...validated.data, is_preset: false })
      .select()
      .single();

    if (error) throw new Error(`Failed to create theme: ${error.message}`);
    return data;
  }),
);

// PATCH /themes/:themeId — updateThemeAction (admin only)
router.patch(
  '/themes/:themeId',
  action(async (supabase, token, req) => {
    await requireAdmin(supabase, token);
    const { themeId } = req.params;

    const updateSchema = themeValidationSchema.omit({ id: true });
    const validated = updateSchema.safeParse(req.body);
    if (!validated.success) throw new Error(validated.error.issues[0].message);

    const { data: existing, error: fetchError } = await supabase
      .from('themes')
      .select('is_preset')
      .eq('id', themeId)
      .maybeSingle();

    if (fetchError) throw new Error(`Failed to check theme: ${fetchError.message}`);
    if (!existing) throw new Error('ไม่พบข้อมูลธีมนี้');

    const { data, error } = await supabase
      .from('themes')
      .update(validated.data)
      .eq('id', themeId)
      .select()
      .single();

    if (error) throw new Error(`Failed to update theme: ${error.message}`);
    return data;
  }),
);

// DELETE /themes/:themeId — deleteThemeAction (admin only)
router.delete(
  '/themes/:themeId',
  action(async (supabase, token, req) => {
    await requireAdmin(supabase, token);
    const { themeId } = req.params;

    const { data: existing, error: fetchError } = await supabase
      .from('themes')
      .select('is_preset')
      .eq('id', themeId)
      .maybeSingle();

    if (fetchError) throw new Error(`Failed to check theme: ${fetchError.message}`);
    if (!existing) throw new Error('ไม่พบข้อมูลธีมนี้');
    if (existing.is_preset) throw new Error('ไม่สามารถลบธีมระบบได้');

    const { error } = await supabase.from('themes').delete().eq('id', themeId);
    if (error) throw new Error(`Failed to delete theme: ${error.message}`);

    return { success: true, themeId };
  }),
);

// PATCH /tournaments/:tournamentId/theme — updateTournamentThemeAction (admin only)
router.patch(
  '/tournaments/:tournamentId/theme',
  action(async (supabase, token, req) => {
    await requireAdmin(supabase, token);
    const { tournamentId } = req.params;
    const { themeStyle } = req.body as { themeStyle: string };

    const { data, error } = await supabase
      .from('tournaments')
      .update({ theme_style: themeStyle })
      .eq('id', tournamentId)
      .select()
      .single();

    if (error) throw new Error(`Failed to update theme: ${error.message}`);
    return data;
  }),
);

export default router;
