// TODO: Membership types are better than strings

export function calculateStartDate(membershipType: string): Date {
    let startDate = new Date();
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    if (membershipType.includes("full")) {
        if (currentMonth >= 0 && currentMonth <= 5) {
            // If todays date is in january-june, set the membership to start from 1st july last year.
            startDate = new Date(currentYear - 1, 6, 1);
        } else {
            // If todays date is july-december, set the membership to start from 1st july this year.
            startDate = new Date(currentYear, 6, 1);
        }
    }

    if (membershipType.includes("semester")) {
        if (currentMonth >= 0 && currentMonth <= 5) {
            // If todays date is in january-june, set the membership to start from 1st january this year.
            startDate = new Date(currentYear, 0, 1);
        } else {
            // If todays date is july-december, set the membership to start from 1st july this year.
            startDate = new Date(currentYear, 6, 1);
        }
    }

    return startDate;
}

export function calculateExpiryDate(membershipType: string): Date {
    let expiryDate = new Date();
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    if (membershipType.includes("full")) {
        if (currentMonth >= 0 && currentMonth <= 5) {
            // If todays date is in january-june, set the membership to last until end of june this year.
            expiryDate = new Date(currentYear, 5, 30);
        } else {
            // If todays date is in july-december, set the membership to last until end of june next year.
            expiryDate = new Date(currentYear + 1, 5, 30);
        }
    }

    if (membershipType.includes("semester")) {
        if (currentMonth >= 0 && currentMonth <= 5) {
            // If todays date is in january-june, set the membership to last until end of june this year.
            expiryDate = new Date(currentYear, 5, 30);
        } else {
            // If todays date is in july-december, set the membership to last until end of december this year.
            expiryDate = new Date(currentYear, 11, 31);
        }
    }

    return expiryDate;
}