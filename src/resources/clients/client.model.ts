/**
 * @file   This file defines a client class
 * @author Alamega
 * @since  1.0.0
 *
 * @namespace Client
 */

 import { v4 as uuid } from 'uuid';
 import { TClientModel } from './client.type';
 
 /** Class representing a Client model */
 class Client {
   /**
    * Creates a user instance
    * @param {TClientModel} client - client Object
    */
   id: string;
   fullName: string;
   address: string;
   numberPhone: number;
   bonusCard: boolean;
 
   constructor({ 
     id = uuid(), 
     fullName = 'Alamega', 
     address = 'Minsk', 
     numberPhone = 375251234567, 
     bonusCard = false 
    } = {}) {
    this.id = id;
    this.fullName = fullName;
    this.address = address;
    this.numberPhone = numberPhone;
    this.bonusCard = bonusCard;
   }

   /**
    * Return static data for client
    * @param {TClientModel} client passing the client object
    * @returns {TClientModel} client parameters
    */
   static toResponse(client: TClientModel) {
     const { id, fullName, address, numberPhone, bonusCard } = client;
     return { id, fullName, address, numberPhone, bonusCard };
   }
 }
 
 export default Client;