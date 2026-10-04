import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';

interface Note {
  id: number;
  title: string;
  text: string;
}

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = '';
  text = '';

  notes: Note[] = [];

  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);

    if (this.isBrowser) {
      const savedNotes = localStorage.getItem('notes');

      if (savedNotes) {
        this.notes = JSON.parse(savedNotes);
      }
    }
  }

  addNote(): void {
    if (!this.title.trim() || !this.text.trim()) {
      return;
    }

    const newNote: Note = {
      id: Date.now(),
      title: this.title,
      text: this.text
    };

    this.notes.push(newNote);

    this.saveNotes();

    this.title = '';
    this.text = '';
  }

  deleteNote(id: number): void {
    this.notes = this.notes.filter(note => note.id !== id);

    this.saveNotes();
  }

  saveNotes(): void {
    if (this.isBrowser) {
      localStorage.setItem('notes', JSON.stringify(this.notes));
    }
  }
}