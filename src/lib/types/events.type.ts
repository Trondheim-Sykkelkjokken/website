export interface EventBriteResponse {
    pagination: Pagination
    events: BikeKitchenEvent[]
}

export interface Pagination {
    object_count: number
    page_number: number
    page_size: number
    page_count: number
    has_more_items: boolean
}

export interface BikeKitchenEvent {
    name: Name
    description: Description
    url: string
    start: Start
    end: End
    organization_id: string
    created: string
    changed: string
    published: string
    capacity: number
    capacity_is_custom: boolean
    status: string
    currency: string
    listed: boolean
    shareable: boolean
    invite_only: boolean
    online_event: boolean
    show_remaining: boolean
    tx_time_limit: number
    hide_start_date: boolean
    hide_end_date: boolean
    locale: string
    is_locked: boolean
    privacy_setting: string
    is_series: boolean
    is_series_parent: boolean
    inventory_type: string
    is_reserved_seating: boolean
    show_pick_a_seat: boolean
    show_seatmap_thumbnail: boolean
    show_colors_in_seatmap_thumbnail: boolean
    source: string
    is_free: boolean
    version: any
    summary: string
    facebook_event_id?: string
    logo_id: string
    organizer_id: string
    venue_id?: string
    category_id: string
    subcategory_id?: string
    format_id: string
    id: string
    resource_uri: string
    is_externally_ticketed: boolean
    logo?: Logo
    series_id?: string
}

export interface Name {
    text: string
    html: string
}

export interface Description {
    text: string
    html: string
}

export interface Start {
    timezone: string
    local: string
    utc: string
}

export interface End {
    timezone: string
    local: string
    utc: string
}

export interface Logo {
    crop_mask?: CropMask
    original: Original
    id: string
    url: string
    aspect_ratio: string
    edge_color?: string
    edge_color_set: boolean
}

export interface CropMask {
    top_left: TopLeft
    width: number
    height: number
}

export interface TopLeft {
    x: number
    y: number
}

export interface Original {
    url: string
    width: number
    height: number
}
