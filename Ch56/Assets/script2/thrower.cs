using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class thrower : MonoBehaviour {
	public Rigidbody coconutPrefab;
	public float throwSpeed = 30.0f;
	public GameObject monkeyPrefab;
	public static int amountDestroyed;
	// Use this for initialization
	void Start () {
		amountDestroyed = 0;
	}
	
	// Update is called once per frame
	void Update () {
		if(Input.GetButtonDown("Fire1")){
			//GetComponent<AudioSource>().PlayOneShot(throwSound);
			Rigidbody newCoconut = Instantiate(coconutPrefab,
				transform.position, transform.rotation) as Rigidbody;
			newCoconut.name = "coconut";
			newCoconut.velocity = transform.forward * throwSpeed;

			Physics.IgnoreCollision(transform.root.GetComponent<Collider>(),
				newCoconut.GetComponent<Collider>(), true);
		}
		if (amountDestroyed == 4) {
			Vector3 vt = transform.position;
			vt.z += 2;
			Instantiate (monkeyPrefab, vt, transform.rotation);
			amountDestroyed++;
		}
	}
}
