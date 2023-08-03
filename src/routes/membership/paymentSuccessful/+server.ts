export function GET({ url }: RequestEvent) {

    let firstName: string = url.searchParams.get('firstName') ?? 'Default firstname';

    let lastName: string = url.searchParams.get('lastName') ?? 'Default lastname';

    return new Response("Hello " + firstName + " " + lastName);

}