export const gameText = {
	dodge: `When a survivor is hit, after rolling hit location dice but before damage, 
they may spend 1 survival to dodge, canceling one hit. 
The dodged hit becomes a failed attack roll and does not cause damage. 
Any additional un-dodged hits resolve normally. 
Dodge is the only survival action that knocked down survivors can perform. 
Each survivor may only Dodge once per round.`,
	encourage:`A standing survivor may spend 1 survival at any time to encourage a knocked down survivor, 
letting them stand. Deaf survivors may not be encouraged. 
Each survivor may only Encourage once per round, 
and only if the settlement has the Language innovation.`,
	surge:`When opportunity permits, a survivor may spend 1 survival to surge. 
Gain +1 Activation which must be spent immediately. 
This allows them to activate a weapon, interact with terrain, use gear, 
and anything else spending an activation allows them to do. 
Resolve the results of the surge (including any monster reactions) before resuming the turn. 
Each survivor may only surge once per round, and only if the settlement has the Inner Lantern innovation.`,
	dash:`When opportunity permits, a survivor may spend 1 survival to dash. 
They gain +1 movement action which must be spent immediately.
Each survivor may only Dash once per round, 
and only after the settlement has innovated the Paint innovation.`,
	endure:`You may spend 7 survival minus your luck to ignore a severe injury before you roll a result.
Your Luck is determined by the sum of your permanent luck attribute,
any luck modifier tokens, and any other gear or abilities affecting your luck at the time you endure.`,
	fistPump:`Bruhhhh~ Encourages someone using your fist.`,
	ponder:`If you are a returning survivor and reach a new Hunt XP milestone, 
you must rank uo your philosophy. Limit, once per settlement phase.`,
	movement: `The maximum amount of spaces a monster or survivor may move with in single move action. 
A monster or survivor with less than 1 movement may still move 1 space each move action.`,
	accuracy:`Increases and decreases in the accuracy attribute represents permanent changes to attack rolls.
Positive attribute adds to the dice roll, while negative attribute subtracts from the dice roll.

Example: If a survivor has 2 accuracy, and rolls a 5 on their attack roll, 
they add the 2 to make the dice value a 7.`,
	strength:`Strength is added to the result of a wound attempt. 
If strength is a negative number, subtract it from the wound attempt result.`,
	evasion:`When a monster or survivor with evasion is the target of an attack,
increase the accuracy on the attack profile by the amount of evasion the target possesses.
Evasion can be a negative number, in which case it is subtracted from the attack profile's accuracy. 
Regardless of evasion, a Lantern 10 on the attack roll is always a Perfect Hit,
and an attack roll result of 1 will always be unsuccessful.`,
	luck:`Luck modifies a survivor's chance to cause a critical wound from a wound roll.
+1 luck causes a critical wound on a wound roll result of 9 or 10, +2 luck on 8, 9, or 10, and so on.
A luck modifier can be negative, making it impossible to critically wound.`,
	speed:`Speed is added to a survivor's weapon speed to determine the number of attack rolls.
If speed is negative, subtract it from the number of dice rolled for an attack.
A survivor attack with less than one speed still has one attack roll.
Weapons with the Slow keyword cannot benefit from positive speed bonuses.`,
	lumi:``
}