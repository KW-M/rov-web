// This file was generated by [ts-rs](https://github.com/Aleph-Alpha/ts-rs). Do not edit this file manually.

export interface ISBD_LINK_STATUS_DATA {
  timestamp: bigint;
  last_heartbeat: bigint;
  failed_sessions: number;
  successful_sessions: number;
  signal_quality: number;
  ring_pending: number;
  tx_session_pending: number;
  rx_session_pending: number;
}
