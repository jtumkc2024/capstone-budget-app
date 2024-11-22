CREATE FUNCTION get_latest_incoming_transaction(userId INT)
RETURNS VARCHAR(512)
BEGIN
    DECLARE recent_transaction VARCHAR(512);

    SELECT CONCAT('Transaction Amount: ', a.transaction_amount, ', Type: ', a.transaction_type, ', Date: ', a.transaction_date)
    INTO recent_transaction
    FROM Accounts a
    JOIN MockupBank mb ON a.account_number = mb.account_number
    JOIN Card c ON mb.card_number = c.card_number
    WHERE c.user_id = userId AND a.transaction_type = 'incoming'
    ORDER BY a.transaction_date DESC
    LIMIT 1;

    RETURN recent_transaction;
END;
