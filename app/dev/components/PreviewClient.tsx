'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Modal, { ModalFooter } from '@/components/ui/Modal';
import { Input, Select, Textarea } from '@/components/ui/Input';

const themes = [
  { id: 'echo', label: 'Echo' },
  { id: 'arena', label: 'Arena' },
  { id: 'cyberpunk', label: 'Cyberpunk' },
  { id: 'void', label: 'Void' },
] as const;

export default function PreviewClient() {
  const [theme, setTheme] = useState<(typeof themes)[number]['id']>('echo');
  const [mode, setMode] = useState<'dark' | 'light'>('dark');
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [season, setSeason] = useState('2026');

  return (
    <div
      data-theme={theme}
      data-mode={mode}
      className="min-h-screen bg-[var(--mode-bg-page)] text-[var(--mode-text-primary)] p-8"
    >
      <div className="max-w-4xl mx-auto space-y-10">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-2xl font-display font-bold">components/ui/ preview</h1>
          <div className="flex items-center gap-3">
            <Select
              label="Theme"
              value={theme}
              onChange={(e) => setTheme(e.target.value as (typeof themes)[number]['id'])}
              className="w-40"
            >
              {themes.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </Select>
            <Select
              label="Mode"
              value={mode}
              onChange={(e) => setMode(e.target.value as 'dark' | 'light')}
              className="w-32"
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
            </Select>
          </div>
        </header>

        <section>
          <h2 className="text-lg font-display font-bold mb-4">Button</h2>
          <Card padding="lg" className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button icon="save">With icon</Button>
              <Button loading>Loading</Button>
              <Button disabled>Disabled</Button>
            </div>
          </Card>
        </section>

        <section>
          <h2 className="text-lg font-display font-bold mb-4">Card</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card>Default card</Card>
            <Card hoverable>Hoverable card (try hovering)</Card>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-display font-bold mb-4">Input family</h2>
          <Card padding="lg" className="space-y-4 max-w-md">
            <Input
              label="ชื่อทีม"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="เช่น RoV Warriors"
            />
            <Input label="With error" error="ชื่อทีมนี้ถูกใช้ไปแล้ว" defaultValue="Bad Value" />
            <Select label="Season" value={season} onChange={(e) => setSeason(e.target.value)}>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
            </Select>
            <Textarea label="คำอธิบาย" hint="สูงสุด 200 ตัวอักษร" placeholder="รายละเอียดทีม..." />
          </Card>
        </section>

        <section>
          <h2 className="text-lg font-display font-bold mb-4">Modal</h2>
          <Button onClick={() => setModalOpen(true)}>Open modal</Button>
          <Modal
            open={modalOpen}
            onOpenChange={setModalOpen}
            title="ยืนยันการลบทีม"
            description="การกระทำนี้ย้อนกลับไม่ได้"
          >
            <p className="text-sm text-[var(--mode-text-muted)]">
              คุณแน่ใจหรือไม่ว่าต้องการลบทีมนี้? สมาชิกทั้งหมดจะถูกนำออกจากทีม
            </p>
            <ModalFooter>
              <Button variant="ghost" onClick={() => setModalOpen(false)}>
                ยกเลิก
              </Button>
              <Button variant="destructive" onClick={() => setModalOpen(false)}>
                ลบทีม
              </Button>
            </ModalFooter>
          </Modal>
        </section>
      </div>
    </div>
  );
}
