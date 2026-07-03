'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { PlusCircle, AlertCircle, Pin } from 'lucide-react';
import { toast } from 'sonner';

interface PostNoticeFormData {
  title: string;
  body: string;
  category: string;
  isImportant: boolean;
}

const CATEGORIES = ['General', 'Maintenance', 'Finance', 'Security', 'Event', 'Meeting'];

export default function PostNoticePanel() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isImportant, setIsImportant] = useState(false);
  const [successId, setSuccessId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<PostNoticeFormData>({
    defaultValues: {
      title: '',
      body: '',
      category: 'General',
      isImportant: false,
    },
  });

  const bodyValue = watch('body', '');

  const onSubmit = async (data: PostNoticeFormData) => {
    setIsSubmitting(true);
    // BACKEND INTEGRATION: POST /api/notices { title, body, category, isImportant, postedBy: currentAdmin.id }
    // If isImportant: trigger email notification via Resend to all residents
    await new Promise((r) => setTimeout(r, 1100));
    setIsSubmitting(false);
    const fakeId = `notice-${Date.now()}`;
    setSuccessId(fakeId);
    toast.success(
      isImportant
        ? 'Notice posted and pinned — residents notified via email'
        : 'Notice posted to the board'
    );
    reset();
    setIsImportant(false);
    setTimeout(() => setSuccessId(null), 3000);
  };

  return (
    <div className="bg-card border border-border rounded-xl card-elevated sticky top-6">
      {/* Header */}
      <div className="flex items-center gap-2 px-5 py-4 border-b border-border">
        <PlusCircle size={16} className="text-primary" />
        <h3 className="text-base font-600 text-foreground">Post a Notice</h3>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-4">
        {/* Important toggle */}
        <div
          className={`flex items-start gap-3 rounded-xl border px-4 py-3 transition-all cursor-pointer ${
            isImportant
              ? 'bg-amber-50 border-amber-300' :'bg-muted/30 border-border hover:border-amber-200'
          }`}
          onClick={() => setIsImportant((v) => !v)}
        >
          <div
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
              isImportant ? 'border-amber-500 bg-amber-500' : 'border-muted-foreground'
            }`}
          >
            {isImportant && <span className="w-2 h-2 rounded-full bg-white" />}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <Pin size={13} className={isImportant ? 'text-amber-500' : 'text-muted-foreground'} />
              <p className={`text-sm font-600 ${isImportant ? 'text-amber-700' : 'text-foreground'}`}>
                Mark as Important
              </p>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
              Pins notice to top of board and sends email to all residents
            </p>
          </div>
        </div>

        {isImportant && (
          <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 fade-in">
            <AlertCircle size={13} className="text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-700 leading-snug">
              All residents will receive an email notification when this notice is published.
            </p>
          </div>
        )}

        {/* Category */}
        <div>
          <label htmlFor="notice-category" className="block text-sm font-600 text-foreground mb-1.5">
            Category
          </label>
          <select
            id="notice-category"
            className="w-full px-3.5 py-2.5 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
            {...register('category', { required: 'Category is required' })}
          >
            {CATEGORIES.map((c) => (
              <option key={`notice-cat-${c}`} value={c}>
                {c}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="mt-1.5 text-xs text-red-500 font-500">{errors.category.message}</p>
          )}
        </div>

        {/* Title */}
        <div>
          <label htmlFor="notice-title" className="block text-sm font-600 text-foreground mb-1.5">
            Notice title
          </label>
          <p className="text-xs text-muted-foreground mb-1.5">
            Keep it concise — residents see this first
          </p>
          <input
            id="notice-title"
            type="text"
            placeholder="e.g. Water Supply Disruption on 5 Jul"
            className={`w-full px-3.5 py-2.5 rounded-lg border text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all ${
              errors.title ? 'border-red-400' : 'border-input hover:border-primary/50'
            }`}
            {...register('title', {
              required: 'Title is required',
              minLength: { value: 10, message: 'Title must be at least 10 characters' },
              maxLength: { value: 120, message: 'Title must be under 120 characters' },
            })}
          />
          {errors.title && (
            <p className="mt-1.5 text-xs text-red-500 font-500">{errors.title.message}</p>
          )}
        </div>

        {/* Body */}
        <div>
          <label htmlFor="notice-body" className="block text-sm font-600 text-foreground mb-1.5">
            Notice content
          </label>
          <p className="text-xs text-muted-foreground mb-1.5">
            Include all relevant details, dates, and instructions
          </p>
          <textarea
            id="notice-body"
            rows={6}
            placeholder="Write the full notice here. Include dates, times, affected areas, and any action residents need to take..."
            className={`w-full px-3.5 py-2.5 rounded-lg border text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all resize-none ${
              errors.body ? 'border-red-400' : 'border-input hover:border-primary/50'
            }`}
            {...register('body', {
              required: 'Notice content is required',
              minLength: { value: 30, message: 'Content must be at least 30 characters' },
            })}
          />
          <div className="flex items-center justify-between mt-1">
            {errors.body ? (
              <p className="text-xs text-red-500 font-500">{errors.body.message}</p>
            ) : (
              <span />
            )}
            <span
              className={`text-[11px] tabular-nums ${
                bodyValue.length > 800 ? 'text-red-500' : 'text-muted-foreground'
              }`}
            >
              {bodyValue.length}/1000
            </span>
          </div>
        </div>

        {/* Posted by (read-only) */}
        <div>
          <label className="block text-sm font-600 text-foreground mb-1.5">Posted by</label>
          <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-lg border border-border bg-muted/50">
            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-[10px] font-700 flex-shrink-0">
              RA
            </div>
            <span className="text-sm text-foreground font-500">Rajesh Agarwal</span>
            <span className="ml-auto text-[10px] font-600 bg-primary/10 text-primary rounded px-1.5 py-0.5">
              Admin
            </span>
          </div>
        </div>

        {/* Success state */}
        {successId && (
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-3 fade-in">
            <span className="text-emerald-500">✓</span>
            <p className="text-sm font-600 text-emerald-700">Notice published successfully</p>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-600 text-sm py-2.5 rounded-lg hover:bg-primary/90 transition-all btn-press disabled:opacity-60 disabled:cursor-not-allowed"
          style={{ minHeight: '42px' }}
        >
          {isSubmitting ? (
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
          ) : (
            <>
              <PlusCircle size={15} />
              {isImportant ? 'Post & Notify Residents' : 'Post Notice'}
            </>
          )}
        </button>

        <p className="text-[11px] text-muted-foreground text-center leading-snug">
          {isImportant
            ? 'This will pin the notice and send an email to all registered residents.' :'Notice will appear in the board immediately after posting.'}
        </p>
      </form>

      {/* Recent activity */}
      <div className="px-5 pb-5">
        <div className="border-t border-border pt-4">
          <p className="text-xs font-600 text-muted-foreground uppercase tracking-wider mb-3">
            Recently Posted
          </p>
          <div className="space-y-2">
            {[
              { id: 'ra-001', title: 'Water Supply Shutdown', time: '2h ago', important: true },
              { id: 'ra-002', title: 'Pest Control Treatment', time: '1d ago', important: false },
              { id: 'ra-003', title: 'Gym Renovation Complete', time: '2d ago', important: false },
            ].map((item) => (
              <div key={item.id} className="flex items-center gap-2">
                {item.important ? (
                  <Pin size={11} className="text-accent flex-shrink-0" />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground flex-shrink-0" />
                )}
                <p className="text-xs text-foreground truncate flex-1">{item.title}</p>
                <span className="text-[10px] text-muted-foreground flex-shrink-0">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
