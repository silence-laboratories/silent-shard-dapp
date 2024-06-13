// Copyright (c) Silence Laboratories Pte. Ltd.
// This software is licensed under the Silence Laboratories License Agreement.

import mixpanel from 'mixpanel-browser';

const MIX_PANEL_TOKEN = process.env.REACT_APP_MIX_PANEL_TOKEN!;
mixpanel.init(MIX_PANEL_TOKEN, {
  autotrack: true,
  loaded: function () {
    mixpanel.track('Mixpanel Loaded on dApp');
  },
});

export enum EventName {
  new_page_visit = 'new_page_visit',
  connect_metamask = 'connect_metamask',
  install_snap = 'install_snap',
  approve_snap = 'approve_snap',
  pairing_device = 'pairing_device',
  snap_account_created = 'snap_account_created',
  delete_account = 'delete_account',
  view_website_page = 'view_website_page',
  recover_on_phone = 'recover_on_phone',
  re_pairing_device = 're_pairing_device',
  unexpected_error = 'unexpected_error',
  send_backup_to_app = 'send_backup_to_app',
}

export const REJECTED_ERROR = 'rejected_on_metamask';

export enum EventScreen {
  connect_metamask = 'connect_metamask',
  dashboard = 'dashboard',
  sending_backup_to_phone = 'sending_backup_to_phone',
}

export enum EventType {
  new_account = 'new_account',
  recovered = 'recovered',
  same_account = 'same_account',
  different_account = 'different_account',
  onboarding = 'onboarding',
  automatic = 'automatic',
  user_click = 'user_click',
}

export enum EventStatus {
  initiated = 'initiated',
  approved = 'approved',
  failed = 'failed',
  success = 'success',
  cancelled = 'cancelled',
}

export enum EventPage {
  silent_shard = 'silent_shard',
  silence_laboratories = 'silence_laboratories',
}

export enum EventVerificationType {
  success = 'success',
  fail = 'fail',
}

export class AnalyticEvent {
  device: string;
  error?: string;
  errorStack?: string;
  screen?: EventScreen;
  status?: EventStatus;
  type?: EventType;
  metamask_address?: string;
  public_key?: string;
  wallet?: string;
  success?: boolean;
  page?: EventPage;
  snapVersion?: string;
  verification?: string;

  constructor() {
    this.device = 'web';
  }

  setError(error: string) {
    this.error = error;
    return this;
  }

  setErrorStack(errorStack: string) {
    this.errorStack = errorStack;
    return this;
  }

  setScreen(screen: EventScreen) {
    this.screen = screen;
    return this;
  }

  setStatus(status: EventStatus) {
    this.status = status;
    return this;
  }

  setType(type: EventType) {
    this.type = type;
    return this;
  }

  setMetamaskAddress(metamask_address: string) {
    this.metamask_address = metamask_address;
    return this;
  }

  setPublicKey(public_key: string) {
    this.public_key = public_key;
    return this;
  }

  setWallet(wallet?: string) {
    this.wallet = wallet ?? 'MetaMask';
    return this;
  }

  setSuccess(success: boolean) {
    this.success = success;
    return this;
  }

  setPage(page: EventPage) {
    this.page = page;
    return this;
  }

  setSnapVersion(snapVersion: string) {
    this.snapVersion = snapVersion;
    return this;
  }

  setVerification(verification: string) {
    this.verification = verification;
    return this;
  }

  private removeNullUndefined() {
    for (const key in this) {
      if (this[key] === null || this[key] === undefined) {
        delete this[key];
      }
    }
    return this;
  }

  toKvObject() {
    return this.removeNullUndefined();
  }
}

export const trackAnalyticEvent = (name: EventName, event: AnalyticEvent) => {
  if (mixpanel) {
    mixpanel.track(name, event.toKvObject());
  }
};
