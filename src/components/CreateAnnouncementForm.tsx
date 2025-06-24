'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { toast } from 'sonner';

export default function CreateAnnouncementForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/admin/api/announcements', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    });

    if (response.ok) {
      toast.success('Announcement created successfully!');
      setTitle('');
      setContent('');
    } else {
      const data = await response.json();
      toast.error(`Error: ${data.message}`);
    }
  };
  return (
    <Card className="bg-[rgba(48,242,242,0.10)] border border-cyan-400/20 shadow-none rounded-none backdrop-blur-[25px]">
      <CardHeader>
        <CardTitle className="text-white text-2xl font-normal font-['FH_Lecturis_Rounded']">
          Create Announcement
        </CardTitle>
        <CardDescription className="text-white/60 text-base font-light">
          Fill out the form below to create a new announcement.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} id="announcement-form">
          <div className="grid w-full items-center gap-6">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="title" className="text-white text-base font-normal">
                Title
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title of your announcement"
                className="bg-[rgba(48,242,242,0.10)] border-none text-white rounded-none px-4 py-3 placeholder:text-white/40 focus:ring-2 focus:ring-cyan-400/50"
                required
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="content" className="text-white text-base font-normal">
                Content
              </Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Content of your announcement"
                className="bg-[rgba(48,242,242,0.10)] border-none text-white rounded-none px-4 py-3 placeholder:text-white/40 focus:ring-2 focus:ring-cyan-400/50 min-h-[120px]"
                required
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="pt-6">
        <div className="flex p-1 items-center gap-1 rounded-[100px] bg-[rgba(48,242,242,0.20)] backdrop-blur-[25px] h-14">
          <button
            type="submit"
            form="announcement-form"
            className="h-12 flex pr-3 py-2 pl-4 justify-center items-center gap-4 text-[16px] rounded-[100px] font-light cursor-pointer text-black transition-all hover:brightness-110"
            style={{ backgroundColor: "#30F2F2" }}
          >
            Create Announcement
            <svg
              className="w-5 h-5 text-black"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </div>
      </CardFooter>
    </Card>
  );
}
