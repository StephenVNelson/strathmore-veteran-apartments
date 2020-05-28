const roommateStatement = (prospects, roommates) => {
  const statements = ["male", "female", "other"].map(sex => {
    const prospectAmount = [...prospects].filter(p => p.fields.sex == sex).length
    const roommateAmount = [...roommates].filter(p => p.sex == sex).length
    const amount = prospectAmount + roommateAmount
    const es = amount > 1 ? "s" : ""
    return amount ? `${amount} ${sex}${es}` : null
  })
  const nonNullStatements = statements.filter(statement => !!statement)
  return nonNullStatements.join(" and ")
}

export default function sharing(prospects, roommates, bedrooms) {
  let boysAndGirls = roommateStatement(prospects, roommates)
  return `I confirm I want to join this group sharing a ${bedrooms} bedroom apartment with ${boysAndGirls}.`
}