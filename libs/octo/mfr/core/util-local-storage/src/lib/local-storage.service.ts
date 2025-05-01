import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  private subscribers: Map<string, Subscriber<any>[]> = new Map();

  public get<T>(key: string): T | null {
    const json = localStorage.getItem(key);
    return json ? (JSON.parse(json) as T) : null;
  }

  public set<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
    this.notify(key, value);
  }

  public clear(key: string) {
    localStorage.removeItem(key);
    this.notify(key);
  }

  public clearAll() {
    localStorage.clear();
    this.notifyAll();
  }

  public subscriber<T>(key: string) {
    return new Observable<T | null>((subscriber) => {
      subscriber.next(this.get<T>(key));

      this.appendSubscriber(key, subscriber);
      return () => this.removeSubscriber(key, subscriber);
    });
  }

  private appendSubscriber<T>(key: string, subscriber: Subscriber<T>) {
    const subscribers = this.subscribers.get(key) || [];
    this.subscribers.set(key, [...subscribers, subscriber]);
  }

  private removeSubscriber<T>(key: string, subscriber: Subscriber<T>) {
    const subscribers = this.subscribers.get(key) || [];

    this.subscribers.set(
      key,
      subscribers.filter((s) => s !== subscriber),
    );
  }

  private notify<T>(key: string, value: T | null = null) {
    const subscribers = this.subscribers.get(key) || [];

    for (const subscriber of subscribers) {
      subscriber.next(value);
    }
  }

  private notifyAll<T>(value: T | null = null) {
    const keys = this.subscribers.keys();

    for (const key of keys) {
      this.notify(key, value);
    }
  }
}
