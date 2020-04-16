package expenses.server.rest.dto;


import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
public class TransactionDTO {

	private Long id;

	private LocalDate date;

	private String description;

	private Long value;

	private TransactionCategoryDTO category;

}
