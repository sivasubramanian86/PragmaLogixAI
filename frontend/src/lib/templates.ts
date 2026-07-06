/**
 * Shared decision templates data.
 * Centralised here so both page.tsx and OutcomesView import from one source.
 */
import type { AgeGroup, Journey } from "./types";

export interface Template {
  id: string;
  title: string;
  profile: AgeGroup;
  journey: Journey;
  icon: string;
  query: string;
}

export const TEMPLATES: Template[] = [
  {
    id: "temp_adult_budget",
    title: "Monthly Subscription Audit",
    profile: "adult",
    journey: "month",
    icon: "💳",
    query: "Spent 50 USD on SaaS subscriptions, 15 USD on streaming, and 20 USD on gym. Audit leaks and propose attention optimizations.",
  },
  {
    id: "temp_adult_schedule",
    title: "Professional Focus Schedule",
    profile: "adult",
    journey: "tomorrow",
    icon: "📅",
    query: "Need to prepare for a slide presentation from 9 AM to 11 AM, attend team standup at 11:30 AM, and optimize sleep schedule (bedtime 11 PM).",
  },
  {
    id: "temp_student_prep",
    title: "Exam Study & Routine Planner",
    profile: "student",
    journey: "tomorrow",
    icon: "📚",
    query: "Student preparing for math exam. Schedule 3 hours of focus study blocks, 1 hour of exercise/play, and set bedtime to 9 PM.",
  },
  {
    id: "temp_student_pocket",
    title: "Student Budget & Savings Planner",
    profile: "student",
    journey: "month",
    icon: "🎮",
    query: "Review monthly pocket money: 10 USD on game skins, 5 USD on candy, and save 15 USD for a new book.",
  },
  {
    id: "temp_senior_health",
    title: "Elderly Health & Medicine Tracker",
    profile: "senior",
    journey: "tomorrow",
    icon: "💊",
    query: "Elderly profile: schedule blood pressure check at 8 AM, morning walk at 7 AM, medication at 12 PM, and rest breaks.",
  },
  {
    id: "temp_senior_maintenance",
    title: "Home Maintenance & Logistics",
    profile: "senior",
    journey: "home",
    icon: "🏠",
    query: "Dishwasher filter needs checking, monthly yard maintenance schedule, and kitchen inventory check-in.",
  },
];

export const JOURNEY_MAP: Record<number, Journey> = {
  0: "tomorrow",
  1: "month",
  2: "home",
};
