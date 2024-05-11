export function calculateClanPoints(contributions) {
    let points = 0;
    contributions.forEach(element => {
        points += element.points;
    });
    return points;
}