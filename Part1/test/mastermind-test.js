//[assignment] write your own unit test to show that your Mastermind variation circuit is working as expected

const chai = require("chai");

const wasm_tester = require("circom_tester").wasm;

const F1Field = require("ffjavascript").F1Field;
const Scalar = require("ffjavascript").Scalar;
exports.p = Scalar.fromString(
  "21888242871839275222246405745257275088548364400416034343698204186575808495617"
);
const Fr = new F1Field(exports.p);

const assert = chai.assert;

describe("Mastermind For Kids circuit test", function () {
  this.timeout(100000000);

  it("Should fail for invalid solution", async () => {
    const circuit = await wasm_tester(
      "contracts/circuits/MastermindVariation.circom"
    );
    await circuit.loadConstraints();

    const INPUT = {
      // Public inputs
      pubGuessA: "1",
      pubGuessB: "1",
      pubGuessC: "1",
      pubNumHit: "1",
      pubNumBlow: "1",
      pubSolnHash: "1",

      // Private inputs
      privSolnA: "0",
      privSolnB: "0",
      privSolnC: "0",
      privSalt: "0",
    };

    const witness = await circuit
      .calculateWitness(INPUT, true)
      .catch((error) => {
        errorString = error.toString();
      });

    assert(errorString.includes("Error: Error: Assert Failed."));
  });

  it("Should compute correct solution for 1 Hit", async () => {
    const circuit = await wasm_tester(
      "contracts/circuits/MastermindVariation.circom"
    );
    await circuit.loadConstraints();

    const INPUT = {
      // Public inputs
      pubGuessA: "1",
      pubGuessB: "4",
      pubGuessC: "5",
      pubNumHit: "1",
      pubNumBlow: "0",
      pubSolnHash:
        "3442053204195349262716560923914872475558209597476605720688552176300697273047",

      // Private inputs
      privSolnA: "1",
      privSolnB: "2",
      privSolnC: "3",
      privSalt: "999",
    };

    const witness = await circuit.calculateWitness(INPUT, true);

    assert(Fr.eq(Fr.e(witness[0]), Fr.e(1)));
    assert(
      Fr.eq(
        Fr.e(witness[1]),
        Fr.e(
          "3442053204195349262716560923914872475558209597476605720688552176300697273047"
        )
      )
    );
  });

  it("Should compute correct solution for 1 Hit 2 Blow", async () => {
    const circuit = await wasm_tester(
      "contracts/circuits/MastermindVariation.circom"
    );
    await circuit.loadConstraints();

    const INPUT = {
      // Public inputs
      pubGuessA: "1",
      pubGuessB: "3",
      pubGuessC: "2",
      pubNumHit: "1",
      pubNumBlow: "2",
      pubSolnHash:
        "3442053204195349262716560923914872475558209597476605720688552176300697273047",

      // Private inputs
      privSolnA: "1",
      privSolnB: "2",
      privSolnC: "3",
      privSalt: "999",
    };

    const witness = await circuit.calculateWitness(INPUT, true);

    assert(Fr.eq(Fr.e(witness[0]), Fr.e(1)));
    assert(
      Fr.eq(
        Fr.e(witness[1]),
        Fr.e(
          "3442053204195349262716560923914872475558209597476605720688552176300697273047"
        )
      )
    );
  });

  it("Should compute correct solution for 3 Hit", async () => {
    const circuit = await wasm_tester(
      "contracts/circuits/MastermindVariation.circom"
    );
    await circuit.loadConstraints();

    const INPUT = {
      // Public inputs
      pubGuessA: "1",
      pubGuessB: "2",
      pubGuessC: "3",
      pubNumHit: "3",
      pubNumBlow: "0",
      pubSolnHash:
        "3442053204195349262716560923914872475558209597476605720688552176300697273047",

      // Private inputs
      privSolnA: "1",
      privSolnB: "2",
      privSolnC: "3",
      privSalt: "999",
    };

    const witness = await circuit.calculateWitness(INPUT, true);

    assert(Fr.eq(Fr.e(witness[0]), Fr.e(1)));
    assert(
      Fr.eq(
        Fr.e(witness[1]),
        Fr.e(
          "3442053204195349262716560923914872475558209597476605720688552176300697273047"
        )
      )
    );
  });
});
